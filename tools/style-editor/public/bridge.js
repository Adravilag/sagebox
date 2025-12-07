/**
 * SageBox Style Editor Bridge
 * 
 * Script para inyectar en tu aplicación Angular/React durante desarrollo.
 * Permite al Style Editor inspeccionar y modificar elementos en tiempo real.
 * 
 * Uso en Angular:
 *   1. Añadir en angular.json > scripts: ["node_modules/@sage-box/style-editor/bridge.js"]
 *   2. O importar en main.ts: import '@sage-box/style-editor/bridge';
 * 
 * Uso en React:
 *   1. Importar en index.tsx: import '@sage-box/style-editor/bridge';
 */

(function() {
  'use strict';

  console.log('%c[StyleEditor Bridge] 🎨 Script cargado', 'color: #6366f1; font-weight: bold;');

  // Detectar si estamos en un iframe
  const isInIframe = window.parent !== window;
  
  console.log('%c[StyleEditor Bridge] En iframe:', 'color: #6366f1;', isInIframe);

  if (!isInIframe) {
    console.log('%c[StyleEditor Bridge] ⚠️ No está en iframe - el bridge solo funciona dentro del Style Editor', 'color: #f59e0b;');
    console.log('%c[StyleEditor Bridge] Abre tu app desde http://localhost:4569 para usar el editor', 'color: #f59e0b;');
    return;
  }

  console.log('%c[StyleEditor Bridge] ✅ Inicializando en iframe...', 'color: #22c55e; font-weight: bold;');

  // Esperar a que el DOM esté listo
  function init() {
    console.log('%c[StyleEditor Bridge] 📦 DOM listo, creando overlay...', 'color: #6366f1;');

    // Estado
    let inspectMode = false;
    let selectedElement = null;
    let hoveredElement = null;
    let isResizing = false;
    let resizeDirection = '';
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    // Crear elementos de overlay
    const overlay = document.createElement('div');
    overlay.id = 'style-editor-overlay';
    overlay.innerHTML = `
      <div class="se-highlight"></div>
      <div class="se-selected"></div>
      <div class="se-info"></div>
      <div class="se-resize-handle se-resize-e" data-dir="e"></div>
      <div class="se-resize-handle se-resize-s" data-dir="s"></div>
      <div class="se-resize-handle se-resize-se" data-dir="se"></div>
      <div class="se-resize-handle se-resize-w" data-dir="w"></div>
      <div class="se-resize-handle se-resize-n" data-dir="n"></div>
    `;

    // Estilos del overlay
    const styles = document.createElement('style');
    styles.textContent = `
      #style-editor-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999999;
      }

      /* El overlay NUNCA captura eventos - siempre pointer-events: none */
      /* Los eventos se capturan en el document */

      #style-editor-overlay.inspect-mode {
        /* Solo visual, sin capturar eventos */
      }

      body.style-editor-inspect-mode {
        cursor: crosshair !important;
      }

      body.style-editor-inspect-mode * {
        cursor: crosshair !important;
      }

      #style-editor-overlay .se-highlight {
        position: absolute;
        border: 2px dashed #6366f1;
        background: rgba(99, 102, 241, 0.1);
        pointer-events: none;
        transition: all 0.1s ease;
        opacity: 0;
      }

      #style-editor-overlay.inspect-mode .se-highlight {
        opacity: 1;
      }

      #style-editor-overlay .se-selected {
        position: absolute;
        border: 2px solid #ef4444;
        background: rgba(239, 68, 68, 0.05);
        pointer-events: none;
        display: none;
      }

      #style-editor-overlay .se-info {
        position: absolute;
        background: #18181b;
        color: #f4f4f5;
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transform: translateY(-100%);
        margin-top: -4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        z-index: 1000000;
      }

      #style-editor-overlay.inspect-mode .se-info {
        opacity: 1;
      }

      #style-editor-overlay .se-info .tag { color: #f472b6; }
      #style-editor-overlay .se-info .class { color: #a78bfa; }
      #style-editor-overlay .se-info .id { color: #fbbf24; }
      #style-editor-overlay .se-info .size { color: #6ee7b7; margin-left: 8px; }

      /* Resize handles */
      #style-editor-overlay .se-resize-handle {
        position: absolute;
        background: #ef4444;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s;
        border-radius: 4px;
      }

      #style-editor-overlay.has-selection .se-resize-handle {
        opacity: 1;
        pointer-events: auto;
      }

      #style-editor-overlay .se-resize-e {
        width: 8px;
        height: 30px;
        cursor: ew-resize;
      }

      #style-editor-overlay .se-resize-w {
        width: 8px;
        height: 30px;
        cursor: ew-resize;
      }

      #style-editor-overlay .se-resize-s {
        width: 30px;
        height: 8px;
        cursor: ns-resize;
      }

      #style-editor-overlay .se-resize-n {
        width: 30px;
        height: 8px;
        cursor: ns-resize;
      }

      #style-editor-overlay .se-resize-se {
        width: 12px;
        height: 12px;
        cursor: nwse-resize;
      }

      #style-editor-overlay .se-resize-handle:hover {
        background: #dc2626;
      }

      /* Panel de estilos inline (para modo blank) */
      #style-editor-inline-panel {
        position: fixed;
        top: 80px;
        right: 16px;
        width: 260px;
        background: rgba(24, 24, 27, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 1000001;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: none;
        overflow: hidden;
      }

      #style-editor-inline-panel.visible {
        display: block;
      }

      #style-editor-inline-panel .sep-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        cursor: move;
      }

      #style-editor-inline-panel .sep-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #f4f4f5;
      }

      #style-editor-inline-panel .sep-element {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #a78bfa;
        font-weight: 400;
      }

      #style-editor-inline-panel .sep-close {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: #71717a;
        cursor: pointer;
        border-radius: 4px;
        font-size: 16px;
        line-height: 1;
      }

      #style-editor-inline-panel .sep-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #f4f4f5;
      }

      #style-editor-inline-panel .sep-content {
        padding: 12px;
        max-height: 400px;
        overflow-y: auto;
      }

      #style-editor-inline-panel .sep-group {
        margin-bottom: 12px;
      }

      #style-editor-inline-panel .sep-label {
        display: block;
        font-size: 10px;
        font-weight: 500;
        color: #71717a;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      #style-editor-inline-panel .sep-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      #style-editor-inline-panel input[type="color"] {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 2px;
        background: #27272a;
      }

      #style-editor-inline-panel input[type="text"],
      #style-editor-inline-panel input[type="number"] {
        flex: 1;
        height: 28px;
        background: #27272a;
        border: 1px solid #3f3f46;
        border-radius: 4px;
        padding: 0 8px;
        color: #f4f4f5;
        font-size: 12px;
        min-width: 0;
      }

      #style-editor-inline-panel input:focus {
        outline: none;
        border-color: #6366f1;
      }

      #style-editor-inline-panel select {
        flex: 1;
        height: 28px;
        background: #27272a;
        border: 1px solid #3f3f46;
        border-radius: 4px;
        padding: 0 8px;
        color: #f4f4f5;
        font-size: 12px;
        cursor: pointer;
      }

      #style-editor-inline-panel .sep-unit {
        font-size: 11px;
        color: #71717a;
        min-width: 18px;
      }

      #style-editor-inline-panel input[type="range"] {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background: #3f3f46;
        -webkit-appearance: none;
        cursor: pointer;
      }

      #style-editor-inline-panel input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #6366f1;
        cursor: pointer;
      }

      #style-editor-inline-panel .sep-range-value {
        font-size: 11px;
        color: #a1a1aa;
        min-width: 30px;
        text-align: right;
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(overlay);

    // Crear panel de estilos inline
    const inlinePanel = document.createElement('div');
    inlinePanel.id = 'style-editor-inline-panel';
    inlinePanel.innerHTML = `
      <div class="sep-header">
        <div class="sep-title">
          Estilos
          <span class="sep-element"></span>
        </div>
        <button class="sep-close">×</button>
      </div>
      <div class="sep-content">
        <div class="sep-group">
          <label class="sep-label">Color</label>
          <div class="sep-row">
            <input type="color" data-prop="color" value="#000000" />
            <input type="text" data-prop="color" value="#000000" />
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Background</label>
          <div class="sep-row">
            <input type="color" data-prop="background-color" value="#ffffff" />
            <input type="text" data-prop="background-color" value="#ffffff" />
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Font Size</label>
          <div class="sep-row">
            <input type="number" data-prop="font-size" value="16" min="8" max="120" />
            <span class="sep-unit">px</span>
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Font Weight</label>
          <div class="sep-row">
            <input type="range" data-prop="font-weight" min="100" max="900" step="100" value="400" />
            <span class="sep-range-value">400</span>
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Padding</label>
          <div class="sep-row">
            <input type="number" data-prop="padding" value="0" min="0" max="200" />
            <span class="sep-unit">px</span>
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Margin</label>
          <div class="sep-row">
            <input type="number" data-prop="margin" value="0" min="0" max="200" />
            <span class="sep-unit">px</span>
          </div>
        </div>
        <div class="sep-group">
          <label class="sep-label">Border Radius</label>
          <div class="sep-row">
            <input type="number" data-prop="border-radius" value="0" min="0" max="100" />
            <span class="sep-unit">px</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(inlinePanel);

    let inlinePanelEnabled = false;

    const highlightEl = overlay.querySelector('.se-highlight');
    const selectedEl = overlay.querySelector('.se-selected');
    const infoEl = overlay.querySelector('.se-info');

    // Generar un selector único para el elemento
    function getElementSelector(el) {
      if (!el) return '';
      
      // Si tiene ID, usar eso
      if (el.id) {
        return '#' + el.id;
      }
      
      // Construir selector con clases y posición
      let selector = el.tagName.toLowerCase();
      
      if (el.className && typeof el.className === 'string') {
        const classes = el.className.trim().split(/\s+/).filter(c => c && !c.startsWith('ng-'));
        if (classes.length > 0) {
          selector += '.' + classes.slice(0, 2).join('.');
        }
      }
      
      // Añadir nth-child si es necesario para unicidad
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === el.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(el) + 1;
          selector += ':nth-of-type(' + index + ')';
        }
      }
      
      return selector;
    }

    // Buscar elemento por selector (para undo/redo)
    function findElementBySelector(selector) {
      if (!selector) return null;
      
      try {
        return document.querySelector(selector);
      } catch (e) {
        console.warn('[Bridge] Selector inválido:', selector);
        return null;
      }
    }

    // Obtener información del elemento
    function getElementInfo(el) {
      if (!el) return null;
      
      const rect = el.getBoundingClientRect();
      const computed = window.getComputedStyle(el);
      
      return {
        tagName: el.tagName,
        id: el.id || '',
        className: typeof el.className === 'string' ? el.className : '',
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          right: rect.right,
          bottom: rect.bottom
        },
        styles: {
          width: computed.width,
          height: computed.height,
          padding: computed.padding,
          margin: computed.margin,
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          borderRadius: computed.borderRadius,
          border: computed.border
        }
      };
    }

    // Actualizar highlight
    function updateHighlight(el) {
      if (!el || !highlightEl || !infoEl) return;
      
      const rect = el.getBoundingClientRect();
      
      highlightEl.style.top = rect.top + 'px';
      highlightEl.style.left = rect.left + 'px';
      highlightEl.style.width = rect.width + 'px';
      highlightEl.style.height = rect.height + 'px';

      // Info tooltip
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `<span class="id">#${el.id}</span>` : '';
      const cls = el.className && typeof el.className === 'string' 
        ? `<span class="class">.${el.className.split(' ')[0]}</span>` 
        : '';
      const size = `<span class="size">${Math.round(rect.width)}×${Math.round(rect.height)}</span>`;
      
      infoEl.innerHTML = `<span class="tag">${tag}</span>${id}${cls}${size}`;
      infoEl.style.top = rect.top + 'px';
      infoEl.style.left = rect.left + 'px';
    }

    // Actualizar selección y handles
    function updateSelection(el) {
      if (!el || !selectedEl) {
        if (selectedEl) selectedEl.style.display = 'none';
        overlay.classList.remove('has-selection');
        return;
      }
      
      const rect = el.getBoundingClientRect();
      
      selectedEl.style.display = 'block';
      selectedEl.style.top = rect.top + 'px';
      selectedEl.style.left = rect.left + 'px';
      selectedEl.style.width = rect.width + 'px';
      selectedEl.style.height = rect.height + 'px';

      // Posicionar handles
      const handleE = overlay.querySelector('.se-resize-e');
      const handleW = overlay.querySelector('.se-resize-w');
      const handleS = overlay.querySelector('.se-resize-s');
      const handleN = overlay.querySelector('.se-resize-n');
      const handleSE = overlay.querySelector('.se-resize-se');

      if (handleE) {
        handleE.style.top = (rect.top + rect.height/2 - 15) + 'px';
        handleE.style.left = (rect.right - 4) + 'px';
      }
      if (handleW) {
        handleW.style.top = (rect.top + rect.height/2 - 15) + 'px';
        handleW.style.left = (rect.left - 4) + 'px';
      }
      if (handleS) {
        handleS.style.top = (rect.bottom - 4) + 'px';
        handleS.style.left = (rect.left + rect.width/2 - 15) + 'px';
      }
      if (handleN) {
        handleN.style.top = (rect.top - 4) + 'px';
        handleN.style.left = (rect.left + rect.width/2 - 15) + 'px';
      }
      if (handleSE) {
        handleSE.style.top = (rect.bottom - 6) + 'px';
        handleSE.style.left = (rect.right - 6) + 'px';
      }

      overlay.classList.add('has-selection');
    }

    // Mouse move - highlight
    function handleMouseMove(e) {
        if (!inspectMode || isResizing) return;
      
      // Ignorar si el mouse está sobre el panel de estilos
      if (e.target.closest('#style-editor-inline-panel')) {
        return;
      }
      
      const el = document.elementFromPoint(e.clientX, e.clientY);

      if (el && el !== document.body && el !== document.documentElement && !el.closest('#style-editor-overlay') && !el.closest('#style-editor-inline-panel')) {
        hoveredElement = el;
        updateHighlight(el);
      }
    }

    // Click - seleccionar
    function handleClick(e) {
      if (!inspectMode) return;
      
      // Ignorar clics dentro del panel de estilos inline
      if (e.target.closest('#style-editor-inline-panel')) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();

      const el = document.elementFromPoint(e.clientX, e.clientY);

      if (el && el !== document.body && el !== document.documentElement && !el.closest('#style-editor-overlay') && !el.closest('#style-editor-inline-panel')) {
        selectedElement = el;
        updateSelection(el);

        // Enviar info al padre
        const info = getElementInfo(el);
        console.log('%c[StyleEditor Bridge] 📍 Elemento seleccionado:', 'color: #22c55e;', info.tagName);
        window.parent.postMessage({
          type: 'style-editor:element-info',
          payload: info
        }, '*');

        // Mostrar panel inline si está habilitado
        if (inlinePanelEnabled) {
          showInlinePanel(el);
        }
      }
    }

    // Funciones del panel inline
    function showInlinePanel(el) {
      if (!el) return;
      
      const panel = document.getElementById('style-editor-inline-panel');
      if (!panel) return;

      panel.classList.add('visible');

      // Actualizar título con info del elemento
      const elementSpan = panel.querySelector('.sep-element');
      if (elementSpan) {
        let text = el.tagName.toLowerCase();
        if (el.id) text += '#' + el.id;
        else if (el.className && typeof el.className === 'string') {
          const cls = el.className.trim().split(/\s+/)[0];
          if (cls) text += '.' + cls;
        }
        elementSpan.textContent = text;
      }

      // Actualizar valores con estilos computados
      const computed = window.getComputedStyle(el);
      updateInlinePanelInput('color', computed.color);
      updateInlinePanelInput('background-color', computed.backgroundColor);
      updateInlinePanelInput('font-size', parseInt(computed.fontSize) || 16);
      updateInlinePanelInput('font-weight', parseInt(computed.fontWeight) || 400);
      updateInlinePanelInput('padding', parseInt(computed.padding) || 0);
      updateInlinePanelInput('margin', parseInt(computed.margin) || 0);
      updateInlinePanelInput('border-radius', parseInt(computed.borderRadius) || 0);
    }

    function hideInlinePanel() {
      const panel = document.getElementById('style-editor-inline-panel');
      if (panel) panel.classList.remove('visible');
    }

    function updateInlinePanelInput(prop, value) {
      const inputs = document.querySelectorAll('#style-editor-inline-panel [data-prop="' + prop + '"]');
      inputs.forEach(input => {
        if (input.type === 'color') {
          input.value = rgbToHex(value) || '#000000';
        } else if (input.type === 'range') {
          input.value = String(value);
          const rangeValue = input.parentElement.querySelector('.sep-range-value');
          if (rangeValue) rangeValue.textContent = String(value);
        } else if (input.type === 'number') {
          input.value = String(value);
        } else {
          input.value = rgbToHex(value) || String(value);
        }
      });
    }

    function rgbToHex(rgb) {
      if (!rgb) return null;
      if (rgb.startsWith('#')) return rgb;
      
      const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return null;
      
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      
      return '#' + r + g + b;
    }

    // Event listeners para el panel inline
    inlinePanel.querySelector('.sep-close').addEventListener('click', (e) => {
      e.stopPropagation();
      hideInlinePanel();
      selectedElement = null;
      updateSelection(null);
    });

    // Detener propagación de clicks en el panel para evitar cambio de selección
    inlinePanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    inlinePanel.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });

    // Hacer draggable el panel inline
    let panelDragging = false;
    let panelOffset = { x: 0, y: 0 };

    inlinePanel.querySelector('.sep-header').addEventListener('mousedown', (e) => {
      if (e.target.closest('.sep-close')) return;
      panelDragging = true;
      const rect = inlinePanel.getBoundingClientRect();
      panelOffset.x = e.clientX - rect.left;
      panelOffset.y = e.clientY - rect.top;
      inlinePanel.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!panelDragging) return;
      inlinePanel.style.right = 'auto';
      inlinePanel.style.left = (e.clientX - panelOffset.x) + 'px';
      inlinePanel.style.top = (e.clientY - panelOffset.y) + 'px';
    });

    document.addEventListener('mouseup', () => {
      panelDragging = false;
      inlinePanel.style.cursor = '';
    });

    // Input handlers para el panel inline
    inlinePanel.querySelectorAll('[data-prop]').forEach(input => {
      input.addEventListener('input', () => {
        if (!selectedElement) return;
        
        const prop = input.dataset.prop;
        let value = input.value;
        
        // Agregar unidades si es necesario
        if (['font-size', 'padding', 'margin', 'border-radius'].includes(prop) && input.type !== 'range') {
          value += 'px';
        }
        
        // Sincronizar inputs de color
        if (input.type === 'color') {
          const textInput = input.parentElement.querySelector('input[type="text"]');
          if (textInput) textInput.value = value;
        } else if (input.type === 'text' && input.parentElement.querySelector('[type="color"]')) {
          const colorInput = input.parentElement.querySelector('[type="color"]');
          if (colorInput && /^#[0-9a-fA-F]{6}$/.test(value)) {
            colorInput.value = value;
          }
        }

        // Actualizar range value display
        if (input.type === 'range') {
          const rangeValue = input.parentElement.querySelector('.sep-range-value');
          if (rangeValue) rangeValue.textContent = value;
        }
        
        // Aplicar estilo
        selectedElement.style[prop] = value;
        updateSelection(selectedElement);
        
        console.log('%c[StyleEditor Bridge] 🎨 Estilo aplicado (inline):', 'color: #22c55e;', prop, '=', value);
      });
    });

    // Resize handlers
    overlay.querySelectorAll('.se-resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        if (!selectedElement) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        isResizing = true;
        resizeDirection = handle.dataset.dir;
        startX = e.clientX;
        startY = e.clientY;
        
        const computed = window.getComputedStyle(selectedElement);
        startWidth = parseFloat(computed.width);
        startHeight = parseFloat(computed.height);

        document.body.style.cursor = window.getComputedStyle(handle).cursor;
        document.body.style.userSelect = 'none';
      });
    });

    document.addEventListener('mousemove', (e) => {
      handleMouseMove(e);

      if (!isResizing || !selectedElement) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (resizeDirection.includes('e')) {
        selectedElement.style.width = Math.max(20, startWidth + dx) + 'px';
      }
      if (resizeDirection.includes('w')) {
        selectedElement.style.width = Math.max(20, startWidth - dx) + 'px';
      }
      if (resizeDirection.includes('s')) {
        selectedElement.style.height = Math.max(20, startHeight + dy) + 'px';
      }
      if (resizeDirection.includes('n')) {
        selectedElement.style.height = Math.max(20, startHeight - dy) + 'px';
      }

      updateSelection(selectedElement);

      // Notificar cambio
      window.parent.postMessage({
        type: 'style-editor:element-resized',
        payload: getElementInfo(selectedElement)
      }, '*');
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });

    // Click listener
    document.addEventListener('click', handleClick, true);

    // Escuchar mensajes del padre (Style Editor)
    window.addEventListener('message', (e) => {
      const { type, payload } = e.data || {};

      switch (type) {
        case 'style-editor:set-inspect-mode':
          inspectMode = payload.enabled;
          overlay.classList.toggle('inspect-mode', inspectMode);
          document.body.classList.toggle('style-editor-inspect-mode', inspectMode);
          console.log('%c[StyleEditor Bridge] 🔍 Modo inspección:', 'color: #6366f1;', inspectMode ? 'ON' : 'OFF');
          
          // Si se desactiva el modo inspección, ocultar el highlight
          if (!inspectMode) {
            const highlight = overlay.querySelector('.se-highlight');
            if (highlight) {
              highlight.style.opacity = '0';
            }
          }
          break;

        case 'style-editor:apply-style':
          if (selectedElement && payload.property && payload.value !== undefined) {
            // Guardar valor anterior para undo
            const computed = window.getComputedStyle(selectedElement);
            const oldValue = computed[payload.property] || '';
            
            selectedElement.style[payload.property] = payload.value;
            updateSelection(selectedElement);
            console.log('%c[StyleEditor Bridge] 🎨 Estilo aplicado:', 'color: #22c55e;', payload.property, '=', payload.value);
            
            window.parent.postMessage({
              type: 'style-editor:style-applied',
              payload: {
                ...getElementInfo(selectedElement),
                selector: getElementSelector(selectedElement),
                change: {
                  property: payload.property,
                  oldValue: oldValue,
                  newValue: payload.value
                }
              }
            }, '*');
          }
          break;

        case 'style-editor:apply-style-by-selector':
          // Para undo/redo - aplicar estilo por selector
          if (payload.selector && payload.property && payload.value !== undefined) {
            const el = findElementBySelector(payload.selector);
            if (el) {
              el.style[payload.property] = payload.value;
              if (el === selectedElement) {
                updateSelection(selectedElement);
              }
              console.log('%c[StyleEditor Bridge] ↩️ Estilo restaurado:', 'color: #f59e0b;', payload.property, '=', payload.value);
            }
          }
          break;

        case 'style-editor:deselect':
          selectedElement = null;
          updateSelection(null);
          hideInlinePanel();
          break;

        case 'enable-inline-panel':
          inlinePanelEnabled = e.data.enabled;
          console.log('%c[StyleEditor Bridge] 📝 Panel inline:', 'color: #6366f1;', inlinePanelEnabled ? 'ON' : 'OFF');
          if (!inlinePanelEnabled) {
            hideInlinePanel();
          }
          break;

        case 'toggle-inspect':
          inspectMode = e.data.enabled;
          overlay.classList.toggle('inspect-mode', inspectMode);
          document.body.classList.toggle('style-editor-inspect-mode', inspectMode);
          console.log('%c[StyleEditor Bridge] 🔍 Modo inspección (toggle):', 'color: #6366f1;', inspectMode ? 'ON' : 'OFF');
          
          // Si se desactiva el inspector, ocultar el panel y limpiar selección
          if (!inspectMode) {
            hideInlinePanel();
            selectedElement = null;
            updateSelection(null);
          }
          break;
      }
    });

    // Notificar que el bridge está listo
    window.parent.postMessage({ type: 'style-editor:bridge-ready' }, '*');
    window.parent.postMessage({ type: 'bridge-ready' }, '*'); // Alias para blank mode
    console.log('%c[StyleEditor Bridge] ✅ Bridge listo y conectado!', 'color: #22c55e; font-weight: bold;');
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
