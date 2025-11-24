"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const tendencias = [
    {
      titulo: "Reducción de muertes por sobredosis en EE. UU.",
      texto:
        "Los CDC reportan una reducción del 24% en muertes por sobredosis en 2025, reflejando avances en salud pública, prevención y acceso a tratamientos.",
      imagen:
        "https://imagenes.elpais.com/resizer/v2/IU3F5Y6BXFFSDKOMEGM5OUHQXY.jpg?auth=d976a71da14c63b78fde2773855f26f02db47e77e3736e7578e422b154d25c27&width=1200",
      link: "https://www.cdc.gov/media/es/releases/2025/2025-los-cdc-reportan-una-reduccion-de-casi-un-24-en-las-muertes-por-sobredosis-de-drogas-en-los.html",
    },
    {
      titulo: "Datos e investigaciones del NIDA",
      texto:
        "El Instituto Nacional sobre el Abuso de Drogas (NIDA) publica recursos sobre prevención, tratamientos innovadores y estadísticas de consumo.",
      imagen:
        "https://nida.nih.gov/sites/default/files/nih_nida_logo_socialmedia.png",
      link: "https://nida.nih.gov/es",
    },
    {
      titulo: "Estadísticas sobre consumo de drogas",
      texto:
        "Get Smart About Drugs presenta estadísticas actualizadas y materiales educativos sobre consumo y abuso de sustancias.",
      imagen:
        "https://www.getsmartaboutdrugs.gov/sites/default/files/styles/featured_teaser/public/2024-08/No-Marijuana.png?h=80c9446d&itok=t8WJMkdq",
      link: "https://www.getsmartaboutdrugs.gov/es/news-statistics/tracking-drug-use-and-other-drug-related-statistics",
    },
  ];

  const nextSlide = () => setIndex((s) => (s + 1) % tendencias.length);
  const prevSlide = () => setIndex((s) => (s - 1 + tendencias.length) % tendencias.length);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 130px)",
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/medical-staff-navigating-busy-hospital-600nw-2557673755.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Capa translúcida */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.55)",
          zIndex: 0,
        }}
      />

      {/* Contenido principal */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "80px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            marginBottom: "25px",
            color: "#133066",
            textAlign: "center",
            textShadow: "0px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Tendencias y Noticias
        </h2>

        {/* Carrusel */}
        <div
          style={{
            position: "relative",
            width: "85%",
            maxWidth: "1050px",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={tendencias[index].imagen}
            alt={tendencias[index].titulo}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
            }}
          />
          <div style={{ padding: "25px 35px" }}>
            <h3
              style={{
                color: "#133066",
                fontSize: "1.3rem",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              {tendencias[index].titulo}
            </h3>
            <p
              style={{
                color: "#333",
                fontSize: "1rem",
                marginBottom: "15px",
                lineHeight: "1.5",
              }}
            >
              {tendencias[index].texto}
            </p>
            <button
              onClick={() => window.open(tendencias[index].link, "_blank")}
              style={{
                backgroundColor: "#133066",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Leer más
            </button>
          </div>

          {/* Flechas */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "45%",
              left: "12px",
              background: "rgba(19,48,102,0.8)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "45%",
              right: "12px",
              background: "rgba(19,48,102,0.8)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>

        {/* Miniaturas */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {tendencias.map((t, i) => (
            <img
              key={i}
              src={t.imagen}
              alt={t.titulo}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? "100px" : "80px",
                height: i === index ? "80px" : "70px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
                border:
                  i === index
                    ? "3px solid #133066"
                    : "2px solid rgba(0,0,0,0.1)",
                opacity: i === index ? 1 : 0.7,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
