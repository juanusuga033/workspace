import { useState } from 'react'
import './App.css'

const initialForm = {
  nombre: '',
  email: '',
  password: '',
  fechaNacimiento: '',
  edad: '',
  telefono: '',
  carrera: 'informatica',
  genero: 'femenino',
  nivel: '3',
  comentarios: '',
  aceptoTerminos: false,
  intereses: [],
  foto: null,
  color: '#4f46e5'
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(null)

  const handleChange = (event) => {
    const { name, type, value, checked, files } = event.target

    if (type === 'checkbox' && name === 'intereses') {
      const selected = formData.intereses.includes(value)
        ? formData.intereses.filter((item) => item !== value)
        : [...formData.intereses, value]

      setFormData((prev) => ({ ...prev, intereses: selected }))
      return
    }

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
      return
    }

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted({
      ...formData,
      foto: formData.foto ? formData.foto.name : 'No adjuntada'
    })
  }

  const handleReset = () => {
    setFormData(initialForm)
    setSubmitted(null)
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Registro de estudiante</h1>
        <p className="intro">
          Este ejemplo usa varios tipos de elementos de formulario para registrar un estudiante.
        </p>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="grid">
            <label>
              Nombre completo
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </label>

            <label>
              Correo electrónico
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>

            <label>
              Contraseña
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>

            <label>
              Fecha de nacimiento
              <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
            </label>

            <label>
              Edad
              <input type="number" name="edad" min="1" max="120" value={formData.edad} onChange={handleChange} required />
            </label>

            <label>
              Teléfono
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </label>
          </div>

          <div className="grid">
            <label>
              Carrera
              <select name="carrera" value={formData.carrera} onChange={handleChange}>
                <option value="informatica">Informática</option>
                <option value="administracion">Administración</option>
                <option value="contaduria">Contaduría</option>
                <option value="diseño">Diseño</option>
              </select>
            </label>

            <label>
              Color favorito
              <input type="color" name="color" value={formData.color} onChange={handleChange} />
            </label>
          </div>

          <fieldset>
            <legend>Género</legend>
            <label className="inline">
              <input type="radio" name="genero" value="femenino" checked={formData.genero === 'femenino'} onChange={handleChange} />
              Femenino
            </label>
            <label className="inline">
              <input type="radio" name="genero" value="masculino" checked={formData.genero === 'masculino'} onChange={handleChange} />
              Masculino
            </label>
            <label className="inline">
              <input type="radio" name="genero" value="otro" checked={formData.genero === 'otro'} onChange={handleChange} />
              Otro
            </label>
          </fieldset>

          <fieldset>
            <legend>Intereses</legend>
            <label className="inline">
              <input type="checkbox" name="intereses" value="deportes" checked={formData.intereses.includes('deportes')} onChange={handleChange} />
              Deportes
            </label>
            <label className="inline">
              <input type="checkbox" name="intereses" value="arte" checked={formData.intereses.includes('arte')} onChange={handleChange} />
              Arte
            </label>
            <label className="inline">
              <input type="checkbox" name="intereses" value="tecnologia" checked={formData.intereses.includes('tecnologia')} onChange={handleChange} />
              Tecnología
            </label>
          </fieldset>

          <label>
            Nivel de conocimiento
            <input type="range" name="nivel" min="1" max="5" value={formData.nivel} onChange={handleChange} />
            <span className="range-value">{formData.nivel}/5</span>
          </label>

          <label>
            Foto de perfil
            <input type="file" name="foto" accept="image/*" onChange={handleChange} />
          </label>

          <label>
            Comentarios
            <textarea name="comentarios" rows="4" value={formData.comentarios} onChange={handleChange} />
          </label>

          <label className="inline checkbox">
            <input type="checkbox" name="aceptoTerminos" checked={formData.aceptoTerminos} onChange={handleChange} />
            Acepto los términos y condiciones
          </label>

          <div className="actions">
            <button type="submit">Registrar estudiante</button>
            <button type="reset" className="secondary">Limpiar</button>
          </div>
        </form>

        {submitted && (
          <section className="summary">
            <h2>Datos enviados</h2>
            <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
