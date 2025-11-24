import os
import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# ============================
# IMPORTAR MAPEOS
# ============================
from codificacion import (
    mapServices, mapArrests, mapFIPS, mapSubstance,
    mapFreqUse, mapIncome, mapSelfHelp, mapDetnlf, mapDetcrim
)

# ============================
# CARGA DEL MODELO DESDE PKL EN /blackend/models/
# ============================

MODEL_PATH = "blackend/models/modelo_final.pkl"

if not os.path.exists(MODEL_PATH):
    raise Exception(f"❌ No se encontró el modelo en {MODEL_PATH}")

try:
    modelos = joblib.load(MODEL_PATH)
    print(">>> Modelo cargado correctamente desde:", MODEL_PATH)
except Exception as e:
    print(f"❌ Error al cargar modelo: {e}")
    raise e

model_bin = modelos["modelo_binario"]
model_multi = modelos["modelo_multiclase"]

# ============================
# INICIAR FastAPI
# ============================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# MAPEO DE RAZONES
# ============================
razones_texto = {
    2: ("Abandono del tratamiento", "Reforzar adherencia, seguimiento semanal."),
    3: ("Finalización por parte del centro", "Revisar historial y confirmar cierre administrativo."),
    4: ("Traslado a otro programa", "Coordinar continuidad del proceso con el nuevo centro."),
    5: ("Encarcelado", "Notificar autoridades sanitarias y evaluar continuidad intramuros."),
    6: ("Fallecido", "Proceder con protocolos institucionales."),
    7: ("Otros", "Revisar caso de forma individual.")
}

# ============================
# ENTRADA DESDE EL FRONTEND
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
# FUNCION DE CODIFICACIÓN
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
# ENDPOINT DE PRUEBA
# ============================
@app.get("/")
def root():
    return {"status": "API funcionando ✔️ desde /blackend"}

# ============================
# ENDPOINT DE PREDICCIÓN
# ============================
@app.post("/predict")
def predict(form: RegistroPaciente):

    X = np.array([encode(form)])

    # Predicción binaria
    pred_bin = model_bin.predict(X)[0]

    if pred_bin == 1:
        return {
            "resultado": "Completed",
            "detalle": "El paciente completará el tratamiento.",
            "recomendacion": "Continuar proceso habitual. Sin alertas clínicas."
        }

    # Predicción de razón
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

# ============================
# EJECUCIÓN LOCAL
# ============================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000))
    )
