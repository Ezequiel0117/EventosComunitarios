export const CATEGORIAS = ['Deportes', 'Medio Ambiente', 'Cultural', 'Salud']
export function validarEvento(datos) {
  const errores = {}
  const organizador = datos.organizador.trim()
  const email = datos.email.trim()
  const descripcion = datos.descripcion.trim()
  if (organizador.length < 2 || organizador.length > 100) errores.organizador = 'El organizador debe tener entre 2 y 100 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errores.email = 'Introduce un correo electrónico válido.'
  if (descripcion.length < 10 || descripcion.length > 1000) errores.descripcion = 'La descripción debe contener entre 10 y 1000 caracteres.'
  const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) && !Number.isNaN(Date.parse(`${datos.fecha}T12:00:00`)) && new Date(`${datos.fecha}T12:00:00`).toISOString().slice(0, 10) === datos.fecha
  const hoy = new Date(); const hoyLocal = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-${String(hoy.getDate()).padStart(2,'0')}`
  if (!fechaValida || datos.fecha < hoyLocal) errores.fecha = 'Selecciona una fecha válida de hoy en adelante.'
  if (!CATEGORIAS.includes(datos.categoria)) errores.categoria = 'Selecciona una categoría válida.'
  return errores
}
