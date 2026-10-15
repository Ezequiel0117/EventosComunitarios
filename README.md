# Eventos Comunitarios

Aplicación web para registrar y consultar eventos comunitarios. El proyecto
está compuesto por un frontend desarrollado con React y Vite, y un backend
desarrollado con Node.js y Express. Los eventos se guardan de forma persistente
en el archivo `backend/eventos.json`.

## Requisitos

- Node.js y npm instalados.
- Dos terminales abiertas en la carpeta raíz del proyecto.

## Instalación

Instala las dependencias de cada parte del proyecto una sola vez:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Iniciar el proyecto

### 1. Iniciar el backend

En una terminal:

```bash
cd backend
node server.js
```

El backend estará disponible en:

```text
http://localhost:3000
```

La ruta principal muestra información de la API. Para consultar los registros,
abre:

```text
http://localhost:3000/registros
```

### 2. Iniciar el frontend

En una segunda terminal:

```bash
cd frontend
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

Para detener cualquiera de los servidores, presiona `Ctrl + C` en su terminal.

## Funcionalidades actuales

- Navegación como SPA mediante React Router.
- Tres rutas principales:
  - `/`: página de inicio.
  - `/registro`: formulario para registrar eventos.
  - `/lista`: lista de eventos guardados.
- Formulario con los campos obligatorios:
  - Organizador.
  - Descripción.
  - Fecha.
  - Categoría.
- Validación en el frontend para evitar envíos incompletos.
- Envío de eventos al backend mediante `POST`.
- Consulta de eventos mediante `GET`.
- Mensajes de carga, éxito, error y lista vacía.
- Persistencia de datos en `backend/eventos.json`.
- Comunicación entre frontend y backend habilitada mediante CORS.

## API

### Consultar eventos

```http
GET http://localhost:3000/registros
```

Respuesta inicial:

```json
[]
```

### Crear un evento

```http
POST http://localhost:3000/registros
Content-Type: application/json
```

Ejemplo de cuerpo:

```json
{
  "organizador": "Comité Vecinal",
  "descripcion": "Jornada de limpieza comunitaria",
  "fecha": "2026-10-20",
  "categoria": "Medio Ambiente"
}
```

El backend genera automáticamente un identificador para cada evento y lo
agrega al archivo `backend/eventos.json`.

## Estructura del proyecto

```text
EventosComunitarios/
├── backend/
│   ├── eventos.json       # Almacenamiento persistente de eventos
│   ├── package.json       # Dependencias y comandos del backend
│   └── server.js          # API de Express
├── frontend/
│   ├── package.json       # Dependencias y comandos del frontend
│   └── src/
│       ├── App.jsx        # Configuración de las rutas
│       └── pages/
│           ├── Inicio.jsx
│           ├── Registro.jsx
│           └── Lista.jsx
└── README.md
```

## Comandos útiles

Desde la carpeta `frontend`:

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la compilación de producción
npm run lint     # Revisa el código con ESLint
```

Desde la carpeta `backend`:

```bash
node server.js   # Inicia la API
```

## Persistencia

Los eventos se almacenan en `backend/eventos.json`. Por eso, los registros
permanecen disponibles aunque se detenga y se vuelva a iniciar el servidor.
Para comenzar nuevamente con una lista vacía, reemplaza el contenido del
archivo por:

```json
[]
```
