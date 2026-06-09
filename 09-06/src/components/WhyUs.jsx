// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  WhyUs.jsx  (¿Por qué elegirnos?)
//
//  INSTRUCCIONES:
//  1. Define el array "razones" con al menos 4 objetos.
//     Cada objeto debe tener: icono, titulo, descripcion.
//  2. Agrega una imagen en la columna izquierda.
//  3. Escribe 2 párrafos sobre la empresa.
//  4. Usa .map() para renderizar la lista de razones.
//
//  PISTAS:
//  - <div className="row align-items-center"> para las columnas
//  - className="list-unstyled" en <ul> quita los bullets
//  - Placeholder: https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec
// ============================================================

// 🛠️ PASO 1: Define tu array de razones
const razones = [
  { icono: '🏆', titulo: 'Técnicos certificados', descripcion: 'Nuestro equipo tiene certificación RETIE y experiencia en instalaciones residenciales y comerciales.' },
  { icono: '⚡', titulo: 'Instalaciones seguras', descripcion: 'Realizamos instalaciones eléctricas con los estándares de seguridad más altos para tu tranquilidad.' },
  { icono: '🛠️', titulo: 'Servicio a tiempo', descripcion: 'Entregamos cada proyecto dentro del plazo acordado, cuidando cada detalle del proceso.' },
  { icono: '📞', titulo: 'Soporte 24/7', descripcion: 'Estamos disponibles para resolver emergencias y consultas técnicas en cualquier momento.' },
];

function WhyUs() {
  return (
    <section id="nosotros" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Columna izquierda: imagen */}
          <div className="col-lg-5">
            <img
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec"
              alt="Logo VoltTec"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Columna derecha: texto y razones */}
          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>

            <p className="text-muted mb-3">
              En VoltTec somos especialistas en soluciones eléctricas para hogares y empresas. Nuestra prioridad es entregar instalaciones seguras, eficientes y adaptadas a cada necesidad.
            </p>
            <p className="text-muted mb-4">
              Contamos con un equipo certificado y un servicio rápido, desde la primera visita técnica hasta el soporte posterior al proyecto.
            </p>

            <ul className="list-unstyled">
              {razones.map((razon, index) => (
                <li key={index} className="mb-3 d-flex gap-3">
                  <span className="fs-4">{razon.icono}</span>
                  <div>
                    <h5 className="mb-1">{razon.titulo}</h5>
                    <p className="mb-0 text-muted">{razon.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;