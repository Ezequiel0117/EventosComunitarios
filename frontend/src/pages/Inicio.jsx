import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <div>
      <h1>Bienvenido a Eventos Comunitarios</h1>
      <nav>
        <ul>
          <li><Link to="/registro">Registrar un Nuevo Evento</Link></li>
          <li><Link to="/lista">Ver Eventos Registrados</Link></li>
        </ul>
      </nav>
    </div>
  )
}
