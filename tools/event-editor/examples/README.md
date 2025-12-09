# Event Editor - Ejemplos

Proyectos de ejemplo para probar el Event Editor de SageBox.

## Ejemplos Disponibles

### 🟢 Vanilla JS

Ejemplos puros con HTML y JavaScript sin frameworks.

| Archivo | Descripción | Puerto |
|---------|-------------|--------|
| `vanilla/index.html` | Demo básico con todos los componentes | 5500 |
| `vanilla/dashboard.html` | Dashboard de aplicación completo | 5500 |
| `vanilla/form.html` | Formulario de registro interactivo | 5500 |

## Cómo Usar

### Opción 1: Servidor de desarrollo incluido

```bash
cd tools/event-editor/examples
npx serve .
```

Esto levanta un servidor en `http://localhost:3000` (o el puerto disponible).

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server"
2. Abre cualquier archivo `.html`
3. Click derecho → "Open with Live Server"

### Opción 3: Servidor Python

```bash
cd tools/event-editor/examples
python -m http.server 5500
```

## Conectar con Event Editor

1. Inicia el Event Editor:
   ```bash
   cd tools/event-editor
   npm run dev
   ```

2. Inicia un servidor de ejemplos (ver arriba)

3. En el Event Editor, ingresa la URL del ejemplo:
   - `http://localhost:5500/vanilla/index.html`
   - `http://localhost:5500/vanilla/dashboard.html`
   - `http://localhost:5500/vanilla/form.html`

4. Los eventos de los componentes SageBox se capturarán automáticamente en la consola.

## Comunicación con Event Editor

Los ejemplos implementan un bridge de comunicación con el Event Editor:

```javascript
// Enviar eventos al Event Editor
function notifyEventEditor(type, payload) {
  if (window.parent !== window) {
    window.parent.postMessage({ type, payload }, '*');
  }
}

// Responder a ping del Event Editor
window.addEventListener('message', (e) => {
  if (e.data.type === 'ping') {
    notifyEventEditor('pong', {});
  }
});

// Notificar eventos de componentes
element.addEventListener('sgClick', (e) => {
  notifyEventEditor('component-event', {
    event: 'sgClick',
    component: 'sg-button',
    detail: e.detail
  });
});
```

## Crear Nuevos Ejemplos

1. Crea un nuevo archivo HTML en la carpeta correspondiente
2. Incluye los scripts de SageBox:
   ```html
   <script type="module" src="https://unpkg.com/sagebox@latest/dist/sagebox/sagebox.esm.js"></script>
   <link rel="stylesheet" href="https://unpkg.com/sagebox@latest/dist/sagebox/sagebox.css">
   ```
3. Implementa el bridge de comunicación (ver arriba)
4. Añade listeners a los componentes SageBox que quieras monitorear

## Estructura

```
examples/
├── package.json
├── README.md
└── vanilla/
    ├── index.html      # Demo básico
    ├── dashboard.html  # Dashboard completo
    └── form.html       # Formulario interactivo
```
