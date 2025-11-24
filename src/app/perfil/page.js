"use client";
import { useRouter } from "next/navigation";

export default function PerfilDoctor() {
  const router = useRouter();

  return (
    <div style={styles.screen}>
      {/* ========================== */}
      {/* 🔵 MISMO LAYOUT SUPERIOR   */}
      {/* ========================== */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          {/* LOGO */}
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
            <defs>
              <mask id="SVGOK6PceUP">
                <g fill="none">
                  <rect width="38" height="26" x="5" y="16" fill="#fff" stroke="#fff" strokeWidth="4.4" rx="3"/>
                  <path fill="#fff" d="M19 8h10V4H19zm11 1v7h4V9zm-12 7V9h-4v7zm11-8a1 1 0 0 1 1 1h4a5 5 0 0 0-5-5zM19 4a5 5 0 0 0-5 5h4a1 1 0 0 1 1-1z"/>
                  <path stroke="#000" strokeWidth="4.4" d="M18 29h12m-6-6v12"/>
                </g>
              </mask>
            </defs>
            <path fill="#fff" d="M0 0h48v48H0z" mask="url(#SVGOK6PceUP)" />
          </svg>

          <h1 style={styles.headerTitle}>HealthPattern</h1>
        </div>

        <nav style={styles.navTop}>
          <div style={styles.navItemTop} onClick={() => router.push("/Home")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#e6e8ef" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span style={styles.navTextTop}>Inicio</span>
          </div>

          <div style={styles.navItemTop} onClick={() => router.push("/Registro")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#e6e8ef" viewBox="0 0 24 24">
              <path d="M9.75 4.5a.25.25 0 0 0-.25.25v4a.75.75 0 0 1-.75.75h-4a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h4a.75.75 0 0 1 .75.75v4c0 .138.112.25.25.25h4.5a.25.25 0 0 0 .25-.25v-4a.75.75 0 0 1 .75-.75h4a.25.25 0 0 0 .25-.25v-4.5a.25.25 0 0 0-.25-.25h-4a.75.75 0 0 1-.75-.75v-4a.25.25 0 0 0-.25-.25z"/>
            </svg>
            <span style={styles.navTextTop}>Registro</span>
          </div>

          <div style={styles.navItemTop} onClick={() => router.push("/perfil")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#e6e8ef" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"/>
            </svg>
            <span style={styles.navTextTop}>Perfil</span>
          </div>
        </nav>
      </header>

      {/* ============================== */}
      {/* CONTENIDO PRINCIPAL            */}
      {/* ============================== */}
      <div style={{ paddingTop: "120px" }}>
        
        {/* TARJETA DOCTOR */}
        <div style={styles.card}>
          <div style={styles.photoContainer}>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
              style={styles.photo}
            />
          </div>

          <h2 style={styles.name}>Dr. Juan Martínez</h2>
          <p style={styles.specialty}>Psiquiatra – Especialista en Adicciones</p>
          <p style={styles.subInfo}>RM-89342 • Clínica Vida</p>

          <div style={styles.statsRow}>
            {stat("42", "Pacientes")}
            {stat("8", "Riesgo Alto")}
            {stat("21", "Predicciones")}
            {stat("2", "Alertas")}
          </div>
        </div>

        {/* ============================== */}
        {/* 🔵 ICONO HISTORIAL + TÍTULO    */}
        {/* ============================== */}
        <div style={styles.iconTitleRow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 2048 2048">
            <path fill="#d1f3fa" d="M1664 0v128H0V0zm-649 512l-67 128H0V512zM0 1024h747l-67 128H0zm1512 0h568L1004 2048H747l304-640H691l535-1024h612zm-559 896l807-768h-456l325-640h-325l-402 768h351l-304 640z"/>
          </svg>
          <h3 style={styles.sectionTitle}>Historial de Pacientes</h3>
        </div>

        <div style={styles.actionsRow}>
          <div style={styles.actionButtonHalf} onClick={() => router.push("/historial")}>
            <span style={styles.actionText}>Ver Historial</span>
          </div>
        </div>

        {/* ============================== */}
        {/* 🔴 ICONO ALERTAS + TÍTULO      */}
        {/* ============================== */}
        <div style={styles.iconTitleRow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 1024 1024">
            <path fill="#e4b2a3" d="M512 244c176.18 0 319 142.82 319 319v233a32 32 0 0 1-32 32H225a32 32 0 0 1-32-32V563c0-176.18 142.82-319 319-319M484 68h56a8 8 0 0 1 8 8v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V76a8 8 0 0 1 8-8"/>
          </svg>
          <h3 style={styles.sectionTitle}>Alertas de Riesgo</h3>
        </div>

        {/* NADA MÁS AQUÍ — ELIMINADA LISTA DE ALERTAS */}

      </div>
    </div>
  );
}

/* COMPONENTES */
const stat = (v, label) => (
  <div style={styles.statBox}>
    <span style={styles.statValue}>{v}</span>
    <span style={styles.statLabel}>{label}</span>
  </div>
);

/* ESTILOS */
const styles = {
  screen: {
    backgroundColor: "#0D2A4A",
    minHeight: "100vh",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    paddingBottom: "40px",
  },

  /* HEADER */
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#133066",
    color: "#fff",
    padding: "14px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 30,
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
  },

  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  headerTitle: { fontWeight: "bold", fontSize: "1.3rem" },

  navTop: { display: "flex", gap: 50 },
  navItemTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  navTextTop: { fontSize: "0.75rem", marginTop: 4 },

  /* TARJETA PRINCIPAL */
  card: {
    backgroundColor: "white",
    margin: "80px 20px 0",
    padding: "25px",
    borderRadius: "25px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 6px 20px rgba(0,0,0,0.20)",
    color: "#0D2A4A",
  },

  photoContainer: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
  },

  photo: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    border: "5px solid white",
    objectFit: "cover",
  },

  name: { marginTop: "75px", fontSize: "1.9rem", fontWeight: 700 },
  specialty: { fontSize: "1.1rem", color: "#555" },
  subInfo: { fontSize: "0.9rem", color: "#777", marginBottom: 20 },

  statsRow: { display: "flex", justifyContent: "space-around", marginTop: 10 },

  statBox: {
    backgroundColor: "#F7F8FA",
    padding: 18,
    borderRadius: 12,
    width: "23%",
    textAlign: "center",
  },

  statValue: { fontSize: "1.4rem", fontWeight: 700 },
  statLabel: { fontSize: "0.75rem", color: "#888" },

  /* TITULOS CON ICONO */
  iconTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginTop: 40,
    paddingLeft: 25,
  },

  sectionTitle: { fontSize: "1.3rem", fontWeight: 600, marginTop: 10 },

  /* ACCIONES */
  actionsRow: {
    display: "flex",
    padding: "0 20px",
    marginTop: 10,
    justifyContent: "center",
  },

  actionButtonHalf: {
    background: "white",
    color: "#0D2A4A",
    padding: "25px 20px",
    borderRadius: 20,
    fontSize: "1.15rem",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 5px 16px rgba(0,0,0,0.18)",
    flex: 1,
    cursor: "pointer",
    maxWidth: 350,
  },

  actionText: { marginLeft: 8, fontSize: "1.1rem" },
};
