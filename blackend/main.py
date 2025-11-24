import os
import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# ============================
# IMPORTAR MAPEOS
# ============================

from .codificacion import (
    mapServices, mapArrests, mapFIPS, mapSubstance,
    mapFreqUse, mapIncome, mapSelfHelp, mapDetnlf, mapDetcrim
)


# CARGA DEL MODELO PKL LOCAL

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "modelo_final.pkl")


if not os.path.exists(MODEL_PATH):
    raise Exception(f"No se encontró el modelo en: {MODEL_PATH}")

modelos = joblib.load(MODEL_PATH)
model_bin = modelos["modelo_binario"]
model_multi = modelos["modelo_multiclase"]

# ============================
# INICIAR API
# ============================

app = FastAPI()

# Permitir TODO en local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# MAPEO DE RAZONES
# ============================

razones_texto = {
    2: ("Abandono del tratamiento", "Reforzar adherencia."),
    3: ("Finalización por parte del centro", "Confirmar cierre."),
    4: ("Traslado", "Coordinar proceso."),
    5: ("Encarcelado", "Activar protocolos."),
    6: ("Fallecido", "Seguir protocolos institucionales."),
    7: ("Otros", "Revisar caso.")
}

# ============================
# ENTRADA DEL FRONT
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
# ENDPOINT DE TEST
# ============================

@app.get("/")
def root():
    return {"status": "API funcionando en local ✔"}

# ============================
# ENDPOINT DE PREDICCIÓN
# ============================

@app.post("/predict")
def predict(form: RegistroPaciente):
    X = np.array([encode(form)])

    pred_bin = model_bin.predict(X)[0]

    if pred_bin == 1:
        return {
            "resultado": "Completed",
            "detalle": "El paciente completará el tratamiento",
            "recomendacion": "Continuar proceso habitual"
        }

    pred_reason = int(model_multi.predict(X)[0])
    razon_texto, recomendacion = razones_texto.get(
        pred_reason, ("Motivo desconocido", "Revisar manualmente")
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
    uvicorn.run(app, host="0.0.0.0", port=8000)
