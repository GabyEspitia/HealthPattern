"use client";

import { useSearchParams } from "next/navigation";

export default function Resultado() {
  const searchParams = useSearchParams();

  const estado = searchParams.get("status");
  const razon = searchParams.get("reason");

  // ============================
  // Razones y recomendaciones
  // ============================
  const razonesTexto = {
    2: "Abandono voluntario del tratamiento, posiblemente asociado a falta de adherencia, desmotivación o factores externos.",
    3: "El centro decidió finalizar el proceso debido a consideraciones clínicas o administrativas.",
    4: "El paciente fue remitido a otro programa con características más apropiadas para su proceso terapéutico.",
    5: "El paciente fue privado de la libertad, lo cual interrumpe el tratamiento actual.",
    6: "Se registró el fallecimiento del paciente.",
    7: "Se identificó otra causa no especificada que interfiere con la continuidad del tratamiento."
  };

  const recomendaciones = {
    2: "Refuerce la adherencia mediante llamadas tempranas, recordatorios diarios, un plan motivacional y apoyo familiar. Los primeros 7 a 10 días son críticos para evitar el abandono.",
    3: "Confirme un plan de seguimiento ambulatorio, entregue material educativo y asegure una transición organizada para evitar interrupciones terapéuticas.",
    4: "Asegure que el nuevo programa reciba al paciente oportunamente, comparta información clínica importante y realice seguimiento inicial.",
    5: "Coordine con las autoridades judiciales opciones de continuidad terapéutica dentro del sistema penitenciario.",
    6: "Active el protocolo institucional correspondiente y brinde acompañamiento emocional a los familiares.",
    7: "Realice una evaluación personalizada para identificar la causa raíz y diseñe estrategias que fortalezcan los factores protectores."
  };

  const textoRazon = razonesTexto[razon] || "";
  const textoRecomendacion = recomendaciones[razon] || "";

  const iconAdvertencia = (
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
    <g fill="none">
      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
      <path fill="#f3c754" d="m13.299 3.148l8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0M12 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-7a1 1 0 0 0-.993.883L11 9v4a1 1 0 0 0 1.993.117L13 13V9a1 1 0 0 0-1-1"/>
    </g>
  </svg>
);

  const iconRazon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
      <path
        fill="#122147"
        fillRule="evenodd"
        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m-1.108 7.935c.23-.453.4-.668.541-.78c.106-.084.25-.155.567-.155c.625 0 1 .47 1 .978c0 .278-.054.416-.202.592c-.207.246-.59.545-1.348 1.046l-.45.296V13a1 1 0 1 0 2 0v-1.017c.542-.374.997-.732 1.327-1.124c.477-.566.673-1.17.673-1.881C15 7.508 13.867 6 12 6c-.684 0-1.289.176-1.808.587c-.484.383-.814.91-1.084 1.445a1 1 0 1 0 1.784.903M13 16.5a1 1 0 1 0-2 0v.5a1 1 0 1 0 2 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const iconRecomendacion = (
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 14 14">
      <g fill="none">
        <path
          fill="#061527"
          fillRule="evenodd"
          d="M10.512.625a.625.625 0 1 0-1.25 0v.82a.625.625 0 1 0 1.25 0zM6.476 6.31a2.429 2.429 0 1 1-4.857 0a2.429 2.429 0 0 1 4.857 0M4.048 9.548A4.05 4.05 0 0 0 0 13.595c0 .224.181.405.405.405H7.69a.405.405 0 0 0 .405-.405a4.05 4.05 0 0 0-4.047-4.047m9.821-7.926a.625.625 0 0 1-.152.87l-.672.472a.625.625 0 0 1-.718-1.023l.671-.471a.625.625 0 0 1 .871.152m-7.814.87a.625.625 0 0 1 .718-1.022l.672.471a.625.625 0 1 1-.718 1.023z"
          clipRule="evenodd"
        />
        <path
          fill="#fbc02d"
          d="M12.113 5.074A2.25 2.25 0 0 0 9.841 2.84a2.25 2.25 0 0 0-2.178 2.327a2.26 2.26 0 0 0 1.231 1.892v1.094a.25.25 0 0 0 .249.242h1.488a.25.25 0 0 0 .248-.242V7.04a2.26 2.26 0 0 0 1.234-1.966"
        />
      </g>
    </svg>
  );

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://espanol.kaiserpermanente.org/content/dam/kporg/jkp/addiction/hero-group-meets-seated-in-a-large-circle/hero-group-meets-seated-in-a-large-circle-l-dt.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "rgba(255,255,255,0.94)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
        }}
      >
        {/* ICONO Y TITULO */}
        <div style={{ textAlign: "center" }}>
          {estado === "completed" ? null : iconAdvertencia}

          <h1 style={{ fontSize: "2rem", marginTop: "15px", color: "#133066" }}>
            Resultado del Análisis
          </h1>

          {/* ============================ */}
          {/* MENSAJE PRINCIPAL EN UN CUADRO */}
          {/* ============================ */}
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: estado === "completed" ? "#e8f5e9" : "#ffebee",
              border: `2px solid ${estado === "completed" ? "#2e7d32" : "#c62828"}`
            }}
          >
            <h2
              style={{
                fontSize: "1.6rem",
                color: estado === "completed" ? "#2e7d32" : "#c62828",
                margin: 0
              }}
            >
              {estado === "completed"
                ? "EL PATIENTE TIENE ALTA PROBABILIDAD DE COMPLETAR CON ÉXITO EL TRATAMIENTO"
                : "EL PACIENTE TIENE ALTA PROBABILIDAD DE DESERTAR DEL TRATAMIENTO"}
            </h2>
          </div>
        </div>

        {/* SOLO SI NO COMPLETA */}
        {estado === "not" && (
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ display: "flex", alignItems: "center", color: "#133066" }}>
              {iconRazon} &nbsp; Razón Estimada
            </h2>
            <p style={{ marginTop: "10px", fontSize: "1.1rem" }}>{textoRazon}</p>

            <h2 style={{ display: "flex", alignItems: "center", color: "#133066" }}>
              {iconRecomendacion} &nbsp; Recomendación
            </h2>
            <p style={{ marginTop: "10px", fontSize: "1rem" }}>{textoRecomendacion}</p>
          </div>
        )}

        {/* BOTÓN */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href="/Registro"
            style={{
              backgroundColor: "#133066",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Volver al Registro
          </a>
        </div>
      </div>
    </div>
  );
}
