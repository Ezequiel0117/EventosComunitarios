import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Registro from './pages/Registro'
import Lista from './pages/Lista'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
