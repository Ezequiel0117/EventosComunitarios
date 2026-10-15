# Auditoría de cumplimiento — versión corregida

**Revisión estática.** La implementación incluye SPA con tres rutas, componentes Layout y EventCard, mensajes, validaciones en React y Express (incluido email), API GET/POST, UUID, CORS y JSON persistente con manejo de errores de lectura/escritura. URL de API configurable con `VITE_API_URL`. Tras guardar se ofrece ir a `/lista`, que realiza GET al montarse; no hay lista simultánea en `/registro`.

**Pruebas pendientes en el entorno del equipo:** `npm install`, `npm run lint`, `npm run build`, ejecución real de GET/POST y reinicio del backend. Las pruebas unitarias del validador están en `backend/server.test.js`. La escritura con archivo temporal protege frente a escritura parcial, pero no implementa bloqueo entre múltiples procesos concurrentes.

**No evaluable desde archivos:** grupo de exactamente cuatro, exclusividad del tema en registro de clase y captura, distribución de tareas, video de 20–30 minutos con aportes, informe, commits de los cuatro, exposición de hasta 10 minutos y preguntas individuales.

**Observación:** El frontend conserva un diseño renovado. No se ha publicado en GitHub porque el conector rechazó escritura con HTTP 403.

**Bloqueo de dependencias:** los lockfiles son esqueletos iniciales y deben regenerarse mediante `npm install` con acceso al registro npm. No se pudo verificar el build ni ejecutar la API en este entorno sin las dependencias.
