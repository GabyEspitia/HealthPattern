"use client";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, fontFamily: "Poppins, sans-serif" }}>
        
        {/* HEADER */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            background: "#133066",
            padding: "18px 45px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            zIndex: 100,
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
          }}
        >
          {/* Izquierda */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
            onClick={() => router.push("/Home")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
              <defs>
                <mask id="HD">
                  <g fill="none">
                    <rect width="38" height="26" x="5" y="16"
                      fill="#fff" stroke="#fff" strokeWidth="4.4" rx="3"/>
                    <path fill="#fff"
                      d="M19 8h10V4H19zm11 1v7h4V9zm-12 7V9h-4v7z"/>
                    <path stroke="#000" strokeWidth="4.4"
                      d="M18 29h12m-6-6v12"/>
                  </g>
                </mask>
              </defs>
              <path fill="#fff" d="M0 0h48v48H0z" mask="url(#HD)" />
            </svg>

            <h1 style={{ fontWeight: 700, fontSize: "1.4rem" }}>HealthPattern</h1>
          </div>

          {/* NAV */}
          <nav style={{ display: "flex", gap: 50, alignItems: "center" }}>
            
            {/* Inicio */}
            <div
              onClick={() => router.push("/Home")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: pathname === "/Home" ? "700" : "400",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                viewBox="0 0 24 24" fill="#e6e8ef">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span style={{ fontSize: "0.85rem", marginTop: 3 }}>Inicio</span>
            </div>

            {/* Registro */}
            <div
              onClick={() => router.push("/Registro")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: pathname === "/Registro" ? "700" : "400",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                viewBox="0 0 24 24" fill="#e6e8ef">
                <path d="M9.75 4.5v4h-4v4.5h4v4h4.5v-4h4v-4.5h-4v-4z"/>
              </svg>
              <span style={{ fontSize: "0.85rem", marginTop: 3 }}>Registro</span>
            </div>

            {/* Perfil */}
            <div
              onClick={() => router.push("/perfil")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: pathname === "/perfil" ? "700" : "400",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                viewBox="0 0 24 24" fill="#e6e8ef">
                <path d="M12 6a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 10c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5"/>
              </svg>
              <span style={{ fontSize: "0.85rem", marginTop: 3 }}>Perfil</span>
            </div>

          </nav>
        </header>

        {/* CONTENIDO */}
        <main style={{ marginTop: "100px" }}>
          {children}
        </main>

      </body>
    </html>
  );
}
