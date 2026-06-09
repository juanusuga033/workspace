// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  Services.jsx
//
//  INSTRUCCIONES:
//  1. Define el array "servicios" con al menos 6 servicios.
//     Cada objeto debe tener: icono, titulo, descripcion.
//  2. Completa el JSX usando tarjetas Bootstrap (card).
//  3. Usa .map() para renderizar — NO copies el HTML 6 veces.
//
//  PISTAS:
//  - Usa <div className="row g-4"> para el grid
//  - Cada tarjeta va en <div className="col-md-6 col-lg-4">
//  - Clases Bootstrap útiles: card, card-body, card-title, card-text
// ============================================================

// 🛠️ PASO 1: Define aquí tu array de servicios
const servicios = [
  {
    icono: '⚡',
    titulo: 'Instalaciones residenciales',
    descripcion:
      'Realizamos instalaciones eléctricas completas para viviendas nuevas, remodelaciones y ampliaciones con sistemas seguros y eficientes.',
  },
  {
    icono: '🏢',
    titulo: 'Instalaciones comerciales',
    descripcion:
      'Diseñamos y ejecutamos redes eléctricas para locales comerciales, oficinas y naves industriales, cumpliendo con normativas locales.',
  },
  {
    icono: '🛠️',
    titulo: 'Mantenimiento preventivo',
    descripcion:
      'Programamos revisiones periódicas para detectar fallas antes de que se conviertan en emergencias y prolongar la vida útil de sus instalaciones.',
  },
  {
    icono: '💡',
    titulo: 'Iluminación LED',
    descripcion:
      'Instalamos soluciones LED de alta eficiencia para hogares y empresas, reduciendo costos energéticos y mejorando el confort visual.',
  },
  {
    icono: '🔌',
    titulo: 'Tableros eléctricos',
    descripcion:
      'Fabricamos e instalamos tableros eléctricos seguros y organizados, con protección adecuada para cada circuito y carga.',
  },
  {
    icono: '🔋',
    titulo: 'Plantas eléctricas',
    descripcion:
      'Ofrecemos instalación y puesta en marcha de plantas de emergencia para garantizar continuidad operativa en cortes de energía.',
  },
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            Conoce las soluciones eléctricas que ofrecemos para hogares, negocios y proyectos industriales con calidad y seguridad.
          </p>
        </div>

        {/* 🛠️ PASO 2: Renderiza las tarjetas con servicios.map(...) */}
        <div className="row g-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="mb-3 display-6">{servicio.icono}</div>
                  <h5 className="card-title">{servicio.titulo}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
