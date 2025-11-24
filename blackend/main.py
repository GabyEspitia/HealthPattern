import os
import joblib
import numpy as np
from fastapi import FastAPI, requests
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Importar los mapeos desde codificacion.py
from .codificacion import (
    mapServices, mapArrests, mapFIPS, mapSubstance,
    mapFreqUse, mapIncome, mapSelfHelp, mapDetnlf, mapDetcrim
)

# DESCARGAR MODELO SI NO EXISTE (VERSIÓN CORREGIDA)
MODEL_PATH = "blackend/models/modelo_final.pkl"
MODEL_URL = "https://drive.google.com/uc?export=download&id=1DPvGTds57i2CGVMPe0ueMXRK0XFszuZi"
CHUNK_SIZE = 32768 # Tamaño de bloque para escribir

os.makedirs("blackend/models", exist_ok=True)

if not os.path.exists(MODEL_PATH):
    print(">>> Modelo no encontrado. Iniciando descarga desde Google Drive...")
    
    # Iniciar la primera solicitud para obtener el token de confirmación (confirm token)
    session = requests.Session()
    response = session.get(MODEL_URL, stream=True)
    
    # 1. Verificar si Google emite la advertencia de "demasiado grande para escanear"
    token = None
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            token = value
            break

    # 2. Si hay token, se crea una nueva URL de descarga con la confirmación
    if token:
        params = {'id': MODEL_URL.split('=')[-1], 'confirm': token}
        MODEL_URL = 'https://drive.google.com/uc?export=download'
        response = session.get(MODEL_URL, params=params, stream=True)

    # 3. Escribir el contenido descargado
    if response.status_code != 200:
        raise Exception(f"Error descargando modelo: Código {response.status_code} - URL: {MODEL_URL}")
    
    # Guardar en bloques (chunks) para archivos grandes
    with open(MODEL_PATH, "wb") as f:
        for chunk in response.iter_content(CHUNK_SIZE):
            if chunk: # filtrar keep-alive new chunks
                f.write(chunk)
    
    print(">>> Modelo descargado correctamente. Intentando cargar...")
    
# Carga del modelo 
try:
    # Esta línea ahora debería funcionar si el archivo se descargó correctamente
    modelos = joblib.load(MODEL_PATH) 
    print(">>> Modelo cargado exitosamente.")
except Exception as e:
    # Si sigue fallando aquí, es que la versión de scikit-learn NO es la correcta
    print(f"Error CRÍTICO al cargar el modelo: {e}")
    print("Asegúrese de que la versión de scikit-learn en requirements.txt es la misma que usó para guardar el modelo.")
    raise
# FastAPI + CORS
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)


# ============================
# Cargar el modelo final
# ============================
modelos = joblib.load("blackend/models/modelo_final.pkl")

model_bin = modelos["modelo_binario"]
model_multi = modelos["modelo_multiclase"]


# ============================
# Mapeo de razones → texto + recomendaciones
# ============================
razones_texto = {
    2: ("Abandono del tratamiento", "Reforzar adherencia, seguimiento semanal."),
    3: ("Finalización por parte del centro", "Revisar historial y confirmar cierre administrativo."),
    4: ("Traslado a otro programa", "Coordinar continuidad del proceso con el nuevo centro."),
    5: ("Encarcelado", "Notificar autoridades sanitarias y evaluar continuidad intramuros."),
    6: ("Fallecido", "Proceder con protocolos institucionales."),
    7: ("Otros", "Revisar caso de forma individual."),
}


# ============================
# Datos esperados desde el frontend
# ============================
class RegistroPaciente(BaseModel):
    services: str
    arrests: str
    stfips: str
    sub1: str
    freq1: str
    priminc: str
    freqSelfHelp: str
    detnlf: str
    detcrim: str


# ============================
# Función de codificación
# ============================
def encode(form: RegistroPaciente):

    return [
        mapServices[form.services],
        mapArrests[form.arrests],
        mapFIPS[form.stfips],
        mapSubstance[form.sub1],
        mapFreqUse[form.freq1],
        mapIncome[form.priminc],
        mapSelfHelp[form.freqSelfHelp],
        mapDetnlf[form.detnlf],
        mapDetcrim[form.detcrim],
    ]


# ============================
# Endpoint de predicción
# ============================
@app.post("/predict")
def predict(form: RegistroPaciente):

    X = np.array([encode(form)])

    # Modelo binario
    pred_bin = model_bin.predict(X)[0]

    # Caso 1: Sí completa
    if pred_bin == 1:
        return {
            "resultado": "Completed",
            "detalle": "El paciente completará el tratamiento.",
            "recomendacion": "Continuar proceso habitual. Sin alertas clínicas."
        }

    # Caso 2: No completa → razón
    pred_reason = int(model_multi.predict(X)[0])

    razon_texto, recomendacion = razones_texto.get(
        pred_reason,
        ("Motivo desconocido", "Revisar el caso manualmente.")
    )

    return {
        "resultado": "Not Completed",
        "razon_no_completado": pred_reason,
        "razon_texto": razon_texto,
        "recomendacion": recomendacion
    }
import os

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000))
    )
