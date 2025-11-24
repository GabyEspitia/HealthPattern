"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Historial() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pacientes")) || [];
    setPacientes(data);
  }, []);

  // Filtrado dinámico
  const pacientesFiltrados = pacientes.filter((p) =>
    `${p.nombre} ${p.edad} ${p.fecha}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "0 auto",
        color: "#0D2A4A",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* TÍTULO */}
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          marginBottom: "25px",
          textAlign: "center",
          color: "#133066",
        }}
      >
        Historial de Pacientes
      </h1>

      {/* BARRA DE BÚSQUEDA */}
      <input
        type="text"
        placeholder="Buscar paciente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          marginBottom: "25px",
          fontSize: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          outline: "none",
        }}
      />

      {/* SI NO HAY PACIENTES */}
      {pacientesFiltrados.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#555" }}>
          No se encontraron pacientes.
        </p>
      ) : (
        <div style={styles.list}>
          {pacientesFiltrados.map((p, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => router.push(`/historial/${index}`)}
            >
              <div style={{ flex: 1 }}>
                <h3 style={styles.name}>{p.nombre}</h3>

                <span style={styles.infoText}>{p.edad} años</span>

                <p style={styles.date}>
                  Registrado el: <b>{p.fecha}</b>
                </p>
              </div>

              <span style={styles.viewBtn}>Ver Detalles</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ESTILOS */
const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  card: {
    backgroundColor: "white",
    padding: "18px 22px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.2s",
    border: "1px solid #e5e5e5",
  },

  name: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#133066",
    marginBottom: "4px",
  },

  infoText: {
    fontSize: "0.95rem",
    color: "#555",
  },

  date: {
    fontSize: "0.85rem",
    color: "#777",
    marginTop: "6px",
  },

  viewBtn: {
    backgroundColor: "#133066",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
