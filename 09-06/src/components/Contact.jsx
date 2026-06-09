import { useState } from "react";

// ============================================================
//  🛠️ COMPONENTE COMPLETADO
//  Contact.jsx
// ============================================================

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "Diseño web",
    mensaje: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Gracias ${formData.nombre || "cliente"}! Hemos recibido tu mensaje. Nos pondremos en contacto pronto.`
    );
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      servicio: "Diseño web",
      mensaje: "",
    });
  };

  return (
    <section id="contacto" className="py-5 bg-dark text-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            Estamos listos para ayudarte. Completa el formulario y nos comunicaremos contigo lo antes posible.
          </p>
        </div>

        <div className="row g-5">

          {/* Columna izquierda: información de contacto */}
          <div className="col-lg-4">
            <h4 className="mb-4">Información de contacto</h4>
            <ul className="list-unstyled text-light opacity-85">
              <li className="mb-3">
                <strong>📍 Dirección:</strong> Carrera 45 # 12-34, Bogotá, Colombia
              </li>
              <li className="mb-3">
                <strong>📞 Teléfono:</strong> +57 321 456 7890
              </li>
              <li className="mb-3">
                <strong>📧 Email:</strong> contacto@miempresa.com
              </li>
              <li className="mb-3">
                <strong>🕐 Horario:</strong> Lunes a viernes, 8:00 a.m. - 6:00 p.m.
              </li>
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-8">
            <form className="bg-white text-dark rounded-3 p-4" onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* Campo: Nombre */}
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                {/* Campo: Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>

                {/* Campo: Teléfono */}
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                {/* Campo: Tipo de servicio — usa <select> con 5+ opciones */}
                <div className="col-md-6">
                  <label htmlFor="servicio" className="form-label">
                    Tipo de servicio
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="Diseño web">Diseño web</option>
                    <option value="Desarrollo de apps">Desarrollo de apps</option>
                    <option value="Marketing digital">Marketing digital</option>
                    <option value="Consultoría">Consultoría</option>
                    <option value="Soporte técnico">Soporte técnico</option>
                  </select>
                </div>

                {/* Campo: Mensaje — usa <textarea> */}
                <div className="col-12">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    placeholder="Cuéntanos cómo podemos ayudarte"
                    required
                  />
                </div>

                {/* Botón enviar */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary px-4">
                    Enviar mensaje
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
