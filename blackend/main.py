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

import os
import joblib 
import gdown # Necesario para la descarga robusta de Google Drive
import pickle # Lo mantenemos por si acaso, pero usaremos joblib

# ============================
# DESCARGAR MODELO CON GDOWN
# ============================

# ⚠️ NOTA: El ID de archivo se extrae de la URL: 1DPvGTds57i2CGVMPe0ueMXRK0XFszuZi
# Usamos el ID directamente, ya que gdown es más robusto que requests.
DRIVE_FILE_ID = "1DPvGTds57i2CGVMPe0ueMXRK0XFszuZi" 
MODEL_PATH = "blackend/models/modelo_final.pkl" 
MODEL_DIR = os.path.dirname(MODEL_PATH)

# Crear el directorio si no existe
os.makedirs(MODEL_DIR, exist_ok=True)

if not os.path.exists(MODEL_PATH):
    print(">>> Modelo no encontrado. Iniciando descarga robusta con gdown...")
    try:
        # Descarga el archivo de Drive usando el ID a la ruta local
        # quiet=False para ver la barra de progreso en los logs (útil para el debug)
        gdown.download(id=DRIVE_FILE_ID, output=MODEL_PATH, quiet=False)
        print(">>> Modelo descargado correctamente con gdown.")

    except Exception as e:
        print(f"Error CRÍTICO al descargar el modelo con gdown: {e}")
        # Lanza una excepción para que el servicio se detenga si falla la descarga
        raise Exception("Fallo crítico en la descarga del modelo con gdown.")

# ============================
# Carga del modelo (Volvemos a joblib con versiones fijadas)
# ============================
try:
    # Usamos joblib.load, ya que las versiones están fijadas
    modelos = joblib.load(MODEL_PATH) 
    print(">>> Modelo cargado exitosamente con joblib y versiones fijadas.")
except Exception as e:
    # Si falla aquí, y el archivo fue descargado limpio, la incompatibilidad es insalvable sin re-guardar.
    print(f"Error CRÍTICO al cargar el modelo: {e}")
    print("ADVERTENCIA: A pesar de la descarga limpia con gdown, el modelo es incompatible con las versiones instaladas.")
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
