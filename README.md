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

## Verificación frente a las instrucciones

### Requisitos técnicos cumplidos

- **Tema:** Eventos comunitarios, con organizador, descripción, fecha y
  categoría.
- **SPA React:** existen las rutas `/`, `/registro` y `/lista`.
- **Estado del formulario:** el formulario se gestiona con `useState`.
- **Petición HTTP:** Axios envía `POST /registros` y consulta
  `GET /registros`.
- **Estados de interfaz:** se muestran validación, confirmación, carga, error y
  lista vacía.
- **API REST:** Express implementa `GET /registros` y `POST /registros`.
- **Respuestas HTTP:** se utilizan `200`, `201`, `400` y `500` según el caso.
- **ID único:** el backend genera un ID para cada evento.
- **CORS:** está habilitado para permitir la comunicación entre los dos
  servidores locales.
- **Persistencia:** los registros se guardan en `backend/eventos.json` sin
  reemplazar los anteriores.
- **Verificación realizada:** el frontend compila con `npm run build`, pasa
  `npm run lint`, y se comprobó la consulta inicial de registros.

### Aspectos que deben completarse o confirmarse para la entrega

- La instrucción general menciona un campo **email**, pero el alcance
  específico de **Eventos comunitarios** define los campos organizador,
  descripción, fecha y categoría. Actualmente se implementa el alcance
  específico; confirmen con el docente si también deben agregar email.
- La validación actual comprueba que los campos no estén vacíos. Todavía no
  valida explícitamente el formato de la fecha ni una fecha pertinente al
  contexto.
- Si el archivo JSON no puede leerse, el backend utiliza temporalmente una
  lista vacía; actualmente no muestra un aviso específico ni recrea el archivo
  automáticamente hasta guardar un registro.
- Las vistas funcionan, pero todavía no se separaron componentes reutilizables
  como menú, tarjeta de evento o componente de mensajes.
- Después de registrar, el formulario muestra la confirmación y limpia sus
  campos. La lista se actualiza al entrar nuevamente a `/lista` o recargarla;
  si la rúbrica exige actualización inmediata sin cambiar de ruta, debe
  agregarse esa lógica.
- La conformación del grupo de exactamente cuatro estudiantes, la
  exclusividad del tema, la captura del registro compartido, el informe, el
  video y la exposición no pueden verificarse desde el código. Deben
  completarse y adjuntarse como parte de la entrega.
- También conviene demostrar en el video o informe el rechazo de un registro
  incompleto y la persistencia después de reiniciar el backend.

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
