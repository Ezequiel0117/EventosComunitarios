# Eventos Comunitarios · ComunidadActiva

Aplicación SPA React + API Express. El archivo `backend/eventos.json` almacena registros persistentes.

## Instalación y ejecución

Node.js 20+ y npm. En dos terminales:

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
npm run dev
```

Frontend por defecto: `http://localhost:5173`. API: `http://localhost:3000`. Para otra URL de API, copia `frontend/.env.example` como `frontend/.env` y cambia `VITE_API_URL` antes de arrancar Vite.

## Rutas y API

- `/`: bienvenida
- `/registro`: formulario
- `/lista`: consulta de eventos (GET fresco cada vez que se visita)
- `GET http://localhost:3000/registros` → 200 y arreglo JSON.
- `POST http://localhost:3000/registros` → 201 y objeto con mensaje/evento, 400 para datos inválidos y 500 si falla almacenamiento.

Ejemplo POST:

```json
{"organizador":"Comité Vecinal","email":"comite@ejemplo.com","descripcion":"Jornada comunitaria de limpieza","fecha":"2026-10-20","categoria":"Medio Ambiente"}
```

Campos obligatorios: organizador (2–100 caracteres), email válido, descripción (10–1000), fecha válida actual o futura y categoría entre Deportes, Medio Ambiente, Cultural y Salud. El backend valida aunque se omita la interfaz.

La aplicación inicia `eventos.json` con `[]` si falta. Si su contenido es ilegible o JSON inválido, responde 500 y NO lo trata como un arreglo vacío. Los ID se generan con `randomUUID()`.

## Pruebas

```bash
cd backend
npm test
```

Además, comprobar manualmente POST válido (201), POST inválido (400), GET (200), reiniciar el backend y confirmar persistencia. Probar lista vacía con un archivo de pruebas alternativo (`DATA_FILE`) para no borrar los datos reales. En frontend, ejecutar `npm run lint` y `npm run build`.

**Evidencias externas pendientes:** cuatro integrantes, coordinación de tema exclusivo y captura, historial verificable de participación, video, informe y exposición. Esta versión no incorpora tales evidencias ni puede acreditarlas por sí sola.

> Los archivos `package-lock.json` incluidos contienen las dependencias declaradas; ejecuta `npm install` con internet para completar las resoluciones y actualizarlos antes de la entrega.
