import joblib

# Cargar tu modelo FINAL
modelos = joblib.load("blackend/models/modelo_final.pkl")

print("Tipo del objeto cargado:", type(modelos))
print("Claves dentro del PKL:", modelos.keys())

# Mostrar el tipo del modelo binario
print("Tipo de modelo dentro del diccionario:", type(modelos["modelo_binario"]))
