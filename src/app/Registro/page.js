"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    fechaNacimiento: "",
    edad: "",
    genero: "",
    services: "",
    arrests: "",
    stfips: "",
    sub1: "",
    freq1: "",
    priminc: "",
    freqSelfHelp: "",
    detnlf: "",
    detcrim: "",
  });

  const [isDate, setIsDate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    for (const key in form) {
      if (form[key] === "") {
        alert("Por favor complete todos los campos antes de continuar.");
        return;
      }
    }
    
    try {
  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      services: form.services,
      arrests: form.arrests,
      stfips: form.stfips,
      sub1: form.sub1,
      freq1: form.freq1,
      priminc: form.priminc,
      freqSelfHelp: form.freqSelfHelp,
      detnlf: form.detnlf,
      detcrim: form.detcrim,
    }),
  });


      const data = await response.json();
      console.log("Respuesta API:", data);

      const status = data.resultado === "Completed" ? "completed" : "not";
      const reason = data.razon_no_completado ?? "";

      // REDIRECCIÓN
      router.push(`/resultado?status=${status}&reason=${reason}`);

    } catch (error) {
      console.error("Error API:", error);
      alert("Error al conectar con la API.");
    }
  };

  const inputStyle = {
    padding: "14px 16px",
    fontSize: "1rem",
    borderRadius: "14px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const inputFocus = {
    borderColor: "#133066",
    boxShadow: "0 0 10px rgba(19,48,102,0.25)",
  };

  const handleFocus = (e) => Object.assign(e.target.style, inputFocus);
  const handleBlur = (e) => {
    e.target.style.borderColor = "#ccc";
    e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "40px 20px",
        overflow: "hidden",
      }}
    >
      {/* Fondo difuminado */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://propharmaresearch.com/sites/default/files/no-responsivas/39398.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(7px) brightness(0.7)",
          transform: "scale(1.1)",
          zIndex: -1,
        }}
      ></div>

      {/* BODY */}
      <main
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "50px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "950px",
          }}
        >
          <h2
            style={{
              color: "#133066",
              textAlign: "center",
              marginBottom: 30,
              fontSize: "1.8rem",
            }}
          >
            Registro del Paciente
          </h2>

          {/* FORMULARIO COMPLETO */}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>

            {/* ——— DATOS GENERALES ——— */}
            <h3 style={{ color: "#133066" }}>Datos Generales</h3>

            <input
              name="nombre"
              value={form.nombre}
              placeholder="Nombre completo"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />

            <input
            type={isDate ? "date" : "text"}
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            placeholder="Fecha de nacimiento"
            onFocus={() => setIsDate(true)}
            onBlur={() => {
              if (!form.fechaNacimiento) setIsDate(false);
            }}
            onChange={handleChange}
            style={inputStyle}
            required
          />



          

            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              min="1"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />

            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Seleccione género</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>

            {/* ——— DATOS CLÍNICOS ——— */}
            <h3 style={{ color: "#133066" }}>Datos Clínicos</h3>

            {/* Aquí siguen TODOS tus SELECTS EXACTAMENTE COMO LOS TENÍAS */}

            {/* ------- SERVICES ------- */}
            <select
              name="services"
              value={form.services}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Tipo de tratamiento recibido</option>
              <option>Desintoxicación hospitalaria (24h)</option>
              <option>Desintoxicación residencial</option>
              <option>Rehabilitación hospitalaria</option>
              <option>Rehabilitación corta (≤30 días)</option>
              <option>Rehabilitación larga ({">"}30 días)</option>
              <option>Ambulatorio intensivo</option>
              <option>Ambulatorio no intensivo</option>
              <option>Ambulatorio desintoxicación</option>
            </select>

            {/* ------- ARRESTS ------- */}
            <select
              name="arrests"
              value={form.arrests}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Arrestos últimos 30 días</option>
              <option value="0">Ninguno</option>
              <option value="1">Una vez</option>
              <option value="2">Dos o más veces</option>
            </select>

            {/* ------- STFIPS ------- */}
            <select
              name="stfips"
              value={form.stfips}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Seleccione el estado (FIPS)</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>District of Columbia</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
              <option>Puerto Rico</option>
            </select>


            {/* ------- SUB1 ------- */}
            <select
              name="sub1"
              value={form.sub1}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Sustancia principal</option>
              <option>Ninguna</option>
              <option>Alcohol</option>
              <option>Cocaína/Crack</option>
              <option>Mariguana/Hashish</option>
              <option>Heroína</option>
              <option>Methadona sin prescripción</option>
              <option>Opiáceos y sintéticos</option>
              <option>PCP (Fenciclidina)</option>
              <option>Alucinógenos</option>
              <option>Metanfetamina</option>
              <option>Otras anfetaminas</option>
              <option>Otros estimulantes</option>
              <option>Benzodiacepinas</option>
              <option>Otros tranquilizantes</option>
              <option>Barbitúricos</option>
              <option>Otros sedantes o hipnóticos</option>
              <option>Inhalantes</option>
              <option>Medicamentos de venta libre</option>
              <option>Otros</option>
            </select>

            {/* ------- FREQ1 ------- */}
            <select
              name="freq1"
              value={form.freq1}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Frecuencia de uso</option>
              <option>No uso en el último mes</option>
              <option>Algunos días</option>
              <option>Uso diario</option>
            </select>

            {/* ------- PRIMINC ------- */}
            <select
              name="priminc"
              value={form.priminc}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Fuente principal de ingresos</option>
              <option>Salario</option>
              <option>Asistencia pública</option>
              <option>Pensión o discapacidad</option>
              <option>Otro</option>
              <option>Ninguno</option>
            </select>

            {/* ------- SELFHELP ------- */}
            <select
              name="freqSelfHelp"
              value={form.freqSelfHelp}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Asistencia a grupos</option>
              <option>No asistió</option>
              <option>1–3 veces en el mes</option>
              <option>4–7 veces en el mes</option>
              <option>8–30 veces en el mes</option>
              <option>Asistencia desconocida</option>
            </select>

            {/* ------- DETNLF ------- */}
            <select
              name="detnlf"
              value={form.detnlf}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Situación laboral</option>
              <option>Ama de casa</option>
              <option>Estudiante</option>
              <option>Retirado o discapacitado</option>
              <option>Institución (prisión, hospital, etc.)</option>
              <option>Otro</option>
            </select>

            {/* ------- DETCRIM ------- */}
            <select
              name="detcrim"
              value={form.detcrim}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            >
              <option value="">Referencia judicial</option>
              <option>Tribunal estatal/federal</option>
              <option>Proceso judicial formal</option>
              <option>Libertad condicional/parole</option>
              <option>Entidad legal reconocida</option>
              <option>Programa de desvío</option>
              <option>Prisión</option>
              <option>DUI/DWI</option>
              <option>Otro</option>
            </select>

            {/* BOTÓN */}
            <button
              type="submit"
              style={{
                backgroundColor: "#133066",
                color: "#fff",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "20px",
                fontSize: "1.05rem",
                transition: "0.2s",
              }}
            >
              Analizar Paciente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
