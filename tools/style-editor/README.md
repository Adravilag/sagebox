# Style Editor

Editor visual de estilos en tiempo real para SageBox.

## Características

- 🎨 **Preview en tiempo real** - Visualiza los componentes mientras editas sus estilos
- 📐 **Resize interactivo** - Arrastra los bordes para cambiar dimensiones
- 🎯 **Panel de estilos** - Modifica tipografía, colores, espaciado, bordes y efectos
- 📱 **Viewports** - Prueba en mobile, tablet y desktop
- ↩️ **Undo/Redo** - Historial de cambios
- 📋 **CSS Output** - Copia el CSS generado

## Uso

```bash
# Desde la raíz del proyecto
cd tools/style-editor
npm install
npm run dev
```

El editor estará disponible en `http://localhost:4568`

## Arquitectura

```text
style-editor/
├── src/
│   ├── components/
│   │   ├── Header.astro       # Barra superior con controles
│   │   ├── Sidebar.astro      # Lista de componentes y tokens
│   │   ├── Preview.astro      # Área de preview con resize
│   │   └── StylePanel.astro   # Panel de edición de estilos
│   ├── layouts/
│   │   └── Layout.astro       # Layout base
│   └── pages/
│       └── index.astro        # Página principal
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Roadmap

- [ ] Cargar componentes de SageBox en el preview
- [ ] Sincronización con tokens CSS
- [ ] Exportar cambios a archivos `.d.ts`
- [ ] Selección de elementos con click
- [ ] Árbol de capas (layers)
- [ ] Guardar presets de estilos
- [ ] Hot reload bidireccional
