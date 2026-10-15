import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const formularioInicial = {
  organizador: '',
  descripcion: '',
  fecha: '',
  categoria: '',
}

export default function Registro() {
  const [formData, setFormData] = useState(formularioInicial)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    if (
      !formData.organizador ||
      !formData.descripcion ||
      !formData.fecha ||
      !formData.categoria
    ) {
      setError('Por favor, completa todos los campos.')
      return
    }

    try {
      const respuesta = await axios.post(
        'http://localhost:3000/registros',
        formData,
      )
      setMensaje(respuesta.data.mensaje)
      setFormData(formularioInicial)
    } catch {
      setError('Error al registrar el evento. Intenta nuevamente.')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrar Evento Comunitario</h2>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <input
          type="text"
          name="organizador"
          placeholder="Nombre del organizador"
          value={formData.organizador}
          onChange={handleChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción del evento"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Deportes">Deportes</option>
          <option value="Medio Ambiente">Medio Ambiente</option>
          <option value="Cultural">Cultural</option>
          <option value="Salud">Salud</option>
        </select>

        <button type="submit">Guardar Evento</button>
      </form>

      <br />
      <Link to="/">Volver al Inicio</Link>
    </div>
  )
}
