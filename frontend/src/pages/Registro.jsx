import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { CATEGORIAS, validarEvento } from '../validation'

const inicial = { organizador: '', email: '', descripcion: '', fecha: '', categoria: '' }
export default function Registro() {
  const [datos, setDatos] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const cambiar = (e) => {
    const { name, value } = e.target
    setDatos(anterior => ({ ...anterior, [name]: value }))
    setErrores(anterior => ({ ...anterior, [name]: undefined, general: undefined }))
  }
  const enviar = async (e) => {
    e.preventDefault()
    if (enviando) return
    setMensaje('')
    const encontrados = validarEvento(datos)
    if (Object.keys(encontrados).length) { setErrores(encontrados); return }
    setEnviando(true)
    try {
      const respuesta = await api.post('/registros', datos)
      setMensaje(respuesta.data.mensaje || 'Evento registrado correctamente.')
      setErrores({})
      setDatos(inicial)
    } catch (err) {
      setErrores({ general: err.response?.data?.error || 'No se pudo registrar el evento. Comprueba que el servidor esté activo.' })
    } finally { setEnviando(false) }
  }
  const campo = (nombre, titulo, elemento, ayuda) => <div className={`field ${nombre === 'descripcion' || nombre === 'organizador' || nombre === 'email' ? 'full' : ''}`} key={nombre}>
    <label htmlFor={nombre}>{titulo} <span className="required">*</span></label>
    {elemento}
    {ayuda && <span className="field-help">{ayuda}</span>}
    {errores[nombre] && <span className="field-error" id={`error-${nombre}`} role="alert">{errores[nombre]}</span>}
  </div>
  return <section className="page-section"><div className="container form-layout">
    <div className="page-header"><span className="eyebrow">Crea una nueva actividad</span><h1>Registrar un evento</h1><p>Comparte una actividad con tu comunidad. Todos los campos son obligatorios.</p></div>
    <div className="content-panel">
      {mensaje && <div className="notice notice-success" role="status">✓ {mensaje} <Link to="/lista"><strong>Ver lista actualizada →</strong></Link></div>}
      {errores.general && <div className="notice notice-error" role="alert">{errores.general}</div>}
      <form onSubmit={enviar} className="event-form" noValidate><div className="form-grid">
        {campo('organizador', 'Organizador', <input id="organizador" name="organizador" type="text" maxLength={100} value={datos.organizador} onChange={cambiar} placeholder="Ej. Comité del barrio" aria-invalid={!!errores.organizador} aria-describedby={errores.organizador ? 'error-organizador' : undefined} required />)}
        {campo('email', 'Correo electrónico', <input id="email" name="email" type="email" maxLength={254} autoComplete="email" value={datos.email} onChange={cambiar} placeholder="organizador@ejemplo.com" aria-invalid={!!errores.email} aria-describedby={errores.email ? 'error-email' : undefined} required />)}
        {campo('descripcion', 'Descripción del evento', <textarea id="descripcion" name="descripcion" maxLength={1000} rows={4} value={datos.descripcion} onChange={cambiar} placeholder="Describe la actividad, el lugar y lo que podrán hacer los asistentes" aria-invalid={!!errores.descripcion} aria-describedby={errores.descripcion ? 'error-descripcion' : undefined} required />, 'Escribe entre 10 y 1000 caracteres.')}
        {campo('fecha', 'Fecha del evento', <input id="fecha" name="fecha" type="date" value={datos.fecha} onChange={cambiar} aria-invalid={!!errores.fecha} aria-describedby={errores.fecha ? 'error-fecha' : undefined} required />)}
        {campo('categoria', 'Categoría', <select id="categoria" name="categoria" value={datos.categoria} onChange={cambiar} aria-invalid={!!errores.categoria} aria-describedby={errores.categoria ? 'error-categoria' : undefined} required><option value="">Selecciona una categoría</option>{CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select>)}
      </div><div className="form-actions"><button className="btn btn-primary" type="submit" disabled={enviando}>{enviando ? 'Guardando…' : 'Guardar evento →'}</button><Link className="btn btn-secondary" to="/lista">Consultar eventos</Link></div></form>
    </div>
  </div></section>
}
