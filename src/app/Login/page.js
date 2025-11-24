"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage:
          "url('https://nurseslabs.com/wp-content/uploads/2020/01/image2-768x512.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {/* Capa translúcida azulada */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(19, 48, 102, 0.45)", // azul translúcido con más visibilidad
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.85)", // menos opaca
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "380px",
          textAlign: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Título con SVG */}
        <h1
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
            fontWeight: "bold",
            color: "#133066",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            style={{ width: "clamp(32px, 10vw, 48px)", height: "auto" }}
          >
            <defs>
              <mask id="SVGMask">
                <g fill="none">
                  <rect
                    width="38"
                    height="26"
                    x="5"
                    y="16"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="4.4"
                    rx="3"
                  />
                  <path
                    fill="#fff"
                    d="M19 8h10V4H19zm11 1v7h4V9zm-12 7V9h-4v7zm11-8a1 1 0 0 1 1 1h4a5 5 0 0 0-5-5zM19 4a5 5 0 0 0-5 5h4a1 1 0 0 1 1-1z"
                  />
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4.4"
                    d="M18 29h12m-6-6v12"
                  />
                </g>
              </mask>
            </defs>
            <path fill="#0a0545" d="M0 0h48v48H0z" mask="url(#SVGMask)" />
          </svg>
          HealthPattern
        </h1>

        {/* Usuario */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", textAlign: "left", marginBottom: 6 }}
          >
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingresa tu usuario"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            }}
          />
        </div>

        {/* Contraseña */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", textAlign: "left", marginBottom: 6 }}
          >
            Contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingresa tu contraseña"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#133066",
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        {/* Botón de login */}
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#133066",
            color: "#fff",
            padding: "10px 0",
            borderRadius: "8px",
            width: "100%",
            border: "none",
            fontWeight: "bold",
            fontSize: "clamp(1rem, 3vw, 1.1rem)",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0a0545")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#133066")}
        >
          Entrar
        </button>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          <a
            href="#"
            style={{ color: "#133066", fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
}
