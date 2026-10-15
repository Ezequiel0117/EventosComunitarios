import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Lista() {
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/registros')
        setEventos(respuesta.data)
      } catch {
        setError('Error al cargar los eventos de la base de datos.')
      } finally {
        setCargando(false)
      }
    }

    cargarEventos()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Eventos Registrados</h2>

      {cargando && <p>Cargando eventos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!cargando && eventos.length === 0 && !error && (
        <p>No hay eventos registrados aún. ¡Registra el primero!</p>
      )}

      {!cargando && eventos.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {eventos.map((evento) => (
            <li
              key={evento.id}
              style={{
                border: '1px solid #ccc',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <strong>Organizador:</strong> {evento.organizador} <br />
              <strong>Descripción:</strong> {evento.descripcion} <br />
              <strong>Fecha:</strong> {evento.fecha} <br />
              <strong>Categoría:</strong> {evento.categoria}
            </li>
          ))}
        </ul>
      )}

      <br />
      <Link to="/">Volver al Inicio</Link>
    </div>
  )
}
