"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetallePaciente({ params }) {
  const router = useRouter();
  const { id } = params;

  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pacientes")) || [];
    setPaciente(data[id]);
  }, [id]);

  if (!paciente) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "120px",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        Cargando información...
      </p>
    );
  }

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
          fontSize: "2rem",
          fontWeight: 700,
          textAlign: "center",
          color: "#133066",
          marginBottom: "30px",
        }}
      >
        Detalle del Paciente
      </h1>

      {/* TARJETA PRINCIPAL */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          border: "1px solid #e5e5e5",
        }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            color: "#133066",
            marginBottom: "15px",
          }}
        >
          {paciente.nombre}
        </h2>

        {/* INFORMACIÓN */}
        <div style={styles.row}>
          <span style={styles.label}>Edad:</span>
          <span style={styles.value}>{paciente.edad} años</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Género:</span>
          <span style={styles.value}>{paciente.genero}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Uso de Servicios:</span>
          <span style={styles.value}>{paciente.services}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Arrestos:</span>
          <span style={styles.value}>{paciente.arrests}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Sustancia Principal:</span>
          <span style={styles.value}>{paciente.sub1}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Frecuencia de Uso:</span>
          <span style={styles.value}>{paciente.freq1}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Fuente Principal:</span>
          <span style={styles.value}>{paciente.priminc}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Grupos de Apoyo:</span>
          <span style={styles.value}>{paciente.freqSelfHelp}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Actividad Laboral:</span>
          <span style={styles.value}>{paciente.detnlf}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Criminalidad:</span>
          <span style={styles.value}>{paciente.detcrim}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Fecha de Registro:</span>
          <span style={styles.value}>{paciente.fecha}</span>
        </div>
      </div>

      {/* BOTÓN VOLVER */}
      <div style={{ textAlign: "center", marginTop: "35px" }}>
        <button
          onClick={() => router.push("/historial")}
          style={{
            backgroundColor: "#133066",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Volver al Historial
        </button>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  label: {
    fontWeight: 600,
    color: "#0D2A4A",
  },
  value: {
    color: "#333",
    fontWeight: 500,
  },
};
