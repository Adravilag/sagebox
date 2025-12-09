# RFC: SageBox Rules Engine

> **Status:** Draft  
> **Author:** Adrian Dávila Guerra
> **Date:** 9 de diciembre de 2025  
> **Related:** Event Editor Tool

---

## 1. Resumen

Sistema declarativo para definir interacciones entre componentes SageBox sin escribir código imperativo repetitivo.

## 2. Motivación

### Problema actual
```typescript
// ❌ Código repetitivo en cada página
const modal = document.querySelector('#my-modal');
const openBtn = document.querySelector('#open-btn');
const closeBtn = document.querySelector('#close-btn');

openBtn?.addEventListener('sgClick', () => modal?.showModal());
closeBtn?.addEventListener('sgClick', () => modal?.close());
modal?.addEventListener('sgClose', (e) => {
  if (e.detail.returnValue === 'confirm') {
    // hacer algo...
  }
});
```

### Solución propuesta
```typescript
// ✅ Declarativo y limpio
export default defineRules({
  'open-modal': {
    on: '#open-btn → sgClick',
    do: '#my-modal.open()'
  },
  'close-modal': {
    on: '#close-btn → sgClick',
    do: '#my-modal.close()'
  },
  'handle-confirm': {
    on: '#my-modal → sgClose',
    when: 'event.detail.returnValue === "confirm"',
    do: () => { /* lógica custom */ }
  }
});
```

---

## 3. Diseño propuesto

### 3.1 Estructura de archivos

```
📁 src/
  📁 rules/
    📄 index.ts              ← Engine + re-exports
    📄 types.ts              ← Tipos TypeScript
    📄 engine.ts             ← Runtime que ejecuta reglas
    📁 pages/
      📄 dashboard.rules.ts  ← Reglas del dashboard
      📄 settings.rules.ts   ← Reglas de settings
      📄 form.rules.ts       ← Reglas de formularios
    📁 shared/
      📄 modals.rules.ts     ← Patrones comunes de modales
      📄 forms.rules.ts      ← Validación de formularios
```

### 3.2 API de definición

```typescript
// types.ts
interface Rule {
  /** Selector + evento que dispara la regla */
  on: string | { selector: string; event: string };
  
  /** Condiciones opcionales (todas deben cumplirse) */
  when?: string | string[] | ((event: Event, ctx: RuleContext) => boolean);
  
  /** Acciones a ejecutar */
  do: string | string[] | ((event: Event, ctx: RuleContext) => void);
  
  /** Regla activa/inactiva */
  enabled?: boolean;
  
  /** Descripción para debugging */
  description?: string;
}

interface RuleContext {
  /** Seleccionar elemento */
  target: (selector: string) => SageBoxElement | null;
  
  /** Evento original */
  event: CustomEvent;
  
  /** Estado compartido entre reglas */
  state: Map<string, any>;
  
  /** Logging */
  log: (message: string) => void;
}
```

### 3.3 Sintaxis del DSL

#### Triggers (on)
```typescript
// Sintaxis corta
on: '#btn → sgClick'
on: '.cards sg-card → sgSelect'
on: 'sg-modal → sgClose'           // Todos los modales

// Sintaxis objeto (más control)
on: { selector: '#btn', event: 'sgClick', capture: true }
```

#### Conditions (when)
```typescript
// String - expresión evaluada
when: '#modal.open'                           // Propiedad boolean
when: 'event.detail.returnValue === "ok"'     // Valor del evento
when: '#input.value.length > 0'               // Expresión

// Array - AND implícito
when: ['#email.valid', '#password.value.length >= 8']

// Función - lógica compleja
when: (event, ctx) => ctx.target('#form').checkValidity()
```

#### Actions (do)
```typescript
// String - acción simple
do: '#modal.open()'
do: '#btn.disabled = true'
do: '#output.textContent = event.detail.value'

// Array - múltiples acciones
do: [
  '#submit.loading = true',
  '#form.submit()',
  '#submit.loading = false'
]

// Función - lógica compleja
do: async (event, ctx) => {
  ctx.target('#btn').loading = true;
  await fetch('/api/save', { body: event.detail });
  ctx.target('#btn').loading = false;
  ctx.target('#toast').show('Guardado!');
}
```

---

## 4. Ejemplos de uso

### 4.1 Modal básico
```typescript
// rules/pages/dashboard.rules.ts
import { defineRules } from '../engine';

export default defineRules({
  'new-project-modal': {
    description: 'Abrir modal de nuevo proyecto',
    on: '#btn-new-project → sgClick',
    do: '#new-project-modal.showModal()'
  },

  'new-project-confirm': {
    description: 'Procesar confirmación del modal',
    on: '#new-project-modal → sgClose',
    when: 'event.detail.returnValue === "confirm"',
    do: (event, ctx) => {
      const formData = ctx.target('#project-form').getFormData();
      console.log('Crear proyecto:', formData);
    }
  }
});
```

### 4.2 Formulario con validación
```typescript
// rules/pages/form.rules.ts
export default defineRules({
  'validate-on-blur': {
    on: '#registration-form sg-input → sgBlur',
    do: (event) => event.target.validate()
  },

  'enable-submit': {
    on: '#registration-form → sgChange',
    do: (event, ctx) => {
      const form = ctx.target('#registration-form');
      ctx.target('#submit-btn').disabled = !form.checkValidity();
    }
  },

  'submit-form': {
    on: '#submit-btn → sgClick',
    when: '#registration-form.valid',
    do: [
      '#submit-btn.loading = true',
      async (e, ctx) => {
        await submitForm(ctx.target('#registration-form'));
        ctx.target('#success-toast').show();
      },
      '#submit-btn.loading = false'
    ]
  }
});
```

### 4.3 Reglas compartidas/reutilizables
```typescript
// rules/shared/modals.rules.ts
import { defineRules } from '../engine';

/** Patrón: Botón abre modal con mismo ID base */
export const modalOpenerPattern = (baseId: string) => defineRules({
  [`open-${baseId}`]: {
    on: `#${baseId}-trigger → sgClick`,
    do: `#${baseId}-modal.showModal()`
  },
  [`close-${baseId}`]: {
    on: `#${baseId}-modal → sgClose`,
    when: 'event.detail.returnValue === "cancel"',
    do: () => console.log(`${baseId} cancelado`)
  }
});

// Uso:
// modalOpenerPattern('settings')  → #settings-trigger abre #settings-modal
// modalOpenerPattern('profile')   → #profile-trigger abre #profile-modal
```

---

## 5. Engine Runtime

### 5.1 Inicialización
```typescript
// rules/engine.ts
class RuleEngine {
  private rules: Map<string, Rule> = new Map();
  private listeners: Map<string, AbortController> = new Map();

  register(rules: Record<string, Rule>) {
    Object.entries(rules).forEach(([id, rule]) => {
      this.rules.set(id, rule);
      this.attachListener(id, rule);
    });
  }

  private attachListener(id: string, rule: Rule) {
    const { selector, event } = this.parseTrigger(rule.on);
    const elements = document.querySelectorAll(selector);
    
    const controller = new AbortController();
    this.listeners.set(id, controller);

    elements.forEach(el => {
      el.addEventListener(event, (e) => this.executeRule(id, rule, e), {
        signal: controller.signal
      });
    });
  }

  private async executeRule(id: string, rule: Rule, event: Event) {
    const ctx = this.createContext(event);
    
    // Check conditions
    if (rule.when && !this.evaluateCondition(rule.when, event, ctx)) {
      return;
    }

    // Execute actions
    await this.executeActions(rule.do, event, ctx);
  }

  // ... más métodos
}

export const rules = new RuleEngine();
export const defineRules = (r: Record<string, Rule>) => r;
```

### 5.2 Uso en la aplicación
```typescript
// main.ts o layout
import { rules } from './rules/engine';
import dashboardRules from './rules/pages/dashboard.rules';
import formRules from './rules/pages/form.rules';
import sharedModalRules from './rules/shared/modals.rules';

// Registrar reglas
rules.register(dashboardRules);
rules.register(formRules);
rules.register(sharedModalRules);

// O con auto-import de todas las reglas
// rules.registerAll(import.meta.glob('./rules/**/*.rules.ts'));
```

---

## 6. Integración con Event Editor

El Event Editor visual generaría archivos `.rules.ts`:

```
┌─────────────────────┐
│   Event Editor UI   │
│   (Visual/ECA)      │
└──────────┬──────────┘
           │ Exportar
           ▼
┌─────────────────────┐
│  dashboard.rules.ts │  ← Archivo generado
│  (TypeScript)       │
└──────────┬──────────┘
           │ Import
           ▼
┌─────────────────────┐
│    Rule Engine      │  ← Runtime execution
│    (Browser)        │
└─────────────────────┘
```

### Flujo de trabajo
1. Dev abre Event Editor
2. Crea reglas visualmente (ECA)
3. Click "Exportar" → genera `page.rules.ts`
4. Archivo se guarda en `src/rules/pages/`
5. Hot-reload aplica cambios instantáneamente
6. Dev puede editar el `.ts` manualmente si necesita más control

---

## 7. Preguntas abiertas

- [ ] **¿Soporte para reglas async?** - ¿Cómo manejar acciones que son Promises?
- [ ] **¿Prioridad de reglas?** - ¿Qué pasa si dos reglas escuchan el mismo evento?
- [ ] **¿Debugging?** - ¿DevTools extension para ver reglas activas?
- [ ] **¿Testing?** - ¿Cómo testear reglas unitariamente?
- [ ] **¿Reglas condicionales por entorno?** - ¿Solo en dev, solo en prod?
- [ ] **¿Namespacing?** - ¿Prevenir colisiones de IDs de reglas?

---

## 8. Alternativas consideradas

### 8.1 JSON puro
```json
{ "on": "#btn", "event": "sgClick", "do": "open", "target": "#modal" }
```
❌ Sin tipos, sin funciones custom, verboso

### 8.2 YAML
```yaml
open-modal:
  on: "#btn → sgClick"
  do: "#modal.open()"
```
❌ Sin tipos, indentación sensible

### 8.3 Web Components nativos (sin engine)
```html
<sg-rule trigger="#btn:sgClick" action="#modal:open"></sg-rule>
```
🤔 Interesante pero mezcla HTML con lógica

---

## 9. Análisis de mercado

### 9.1 Comparativa de soluciones existentes

| Herramienta | Enfoque | Target | Pros | Contras |
|-------------|---------|--------|------|---------|
| **Alpine.js** | Declarativo en HTML | Devs | Ligero, inline | Sin UI visual, mezcla HTML |
| **Stimulus** | Controllers en HTML | Devs (Rails) | Organizado, conventions | Verboso, solo Rails-style |
| **HTMX** | Atributos HTML | Devs | Server-driven, simple | Solo HTTP, no lógica local |
| **Webflow Interactions** | Visual UI | Diseñadores | No-code, potente | Propietario, solo Webflow |
| **Framer Motion** | Animaciones | Devs/Diseñadores | React, visual en editor | Solo animaciones |
| **Retool/Appsmith** | Low-code | PMs/Devs | Visual completo | Apps internas, vendor lock |
| **XState** | State machines | Devs | Robusto, visual | Complejidad, curva aprendizaje |

### 9.2 Análisis detallado de competidores

#### Alpine.js - Lo más cercano en código
```html
<!-- Alpine: declarativo pero en HTML -->
<button @click="open = true">Abrir</button>
<div x-show="open" @click.outside="open = false">Modal</div>
```

**vs SageBox Rules Engine:**
```typescript
// Declarativo pero en TS separado
'toggle-modal': {
  on: '#btn → sgClick',
  do: '#modal.toggle()'
}
```

| Aspecto | Alpine.js | SageBox Rules |
|---------|-----------|---------------|
| Ubicación | En HTML | Archivo TS separado |
| Tipos | ❌ No | ✅ TypeScript |
| UI Visual | ❌ No | ✅ Event Editor |
| Separación | ❌ Mezcla | ✅ Clean |

#### Webflow Interactions - Lo más cercano en UX
- UI visual drag & drop para crear interacciones
- Timeline de animaciones
- Triggers y acciones visuales

| Aspecto | Webflow | SageBox Rules |
|---------|---------|---------------|
| UI Visual | ✅ Potente | ✅ Event Editor |
| Output | Propietario | TypeScript estándar |
| Vendor lock | ✅ Sí | ❌ No |
| Open source | ❌ No | ✅ Sí |

#### XState - Lo más cercano en arquitectura
```typescript
// XState: máquinas de estado
const machine = createMachine({
  initial: 'closed',
  states: {
    closed: { on: { OPEN: 'open' } },
    open: { on: { CLOSE: 'closed' } }
  }
});
```

| Aspecto | XState | SageBox Rules |
|---------|--------|---------------|
| Modelo | State machines | Event-driven rules |
| Complejidad | Alta | Baja |
| Curva aprendizaje | Pronunciada | Suave |
| Visualización | Sí (Stately) | Sí (Event Editor) |

### 9.3 Diferenciador único de SageBox Rules

**Ninguna solución combina:**

1. **🎨 UI Visual** (Event Editor) → para crear interacciones rápidamente
2. **📝 TypeScript output** → código real, versionable, con tipos
3. **✨ DSL limpio** → fácil de leer y editar manualmente
4. **🧩 Específico para Web Components** → tipado de eventos custom de SageBox

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Webflow        Alpine.js       TypeScript             │
│   Interactions + Simplicity  +   Type Safety            │
│                                                         │
│                    = SageBox Rules Engine               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 9.4 Posicionamiento

| Audiencia | Necesidad | Solución actual | SageBox Rules |
|-----------|-----------|-----------------|---------------|
| Dev junior | Interacciones simples | Copy-paste código | ✅ UI visual genera código |
| Dev senior | Control + tipos | Código manual | ✅ DSL tipado + escape hatch |
| Diseñador técnico | Prototipado | Webflow/Framer | ✅ Event Editor visual |
| Equipo mixto | Colaboración | Documentación | ✅ Reglas legibles por todos |

---

## 10. Plan de implementación

### Fase 1: Core Engine
- [ ] Tipos TypeScript (`Rule`, `RuleContext`)
- [ ] Parser de sintaxis DSL (`#btn → sgClick`)
- [ ] `defineRules()` helper
- [ ] Ejecución básica de reglas

### Fase 2: Integración
- [ ] Hook en páginas SageBox
- [ ] Hot-reload con Vite
- [ ] Ejemplos de reglas comunes

### Fase 3: Event Editor Export
- [ ] Botón "Exportar a .rules.ts"
- [ ] Formateo del código generado
- [ ] Detección de archivo existente (merge vs overwrite)

### Fase 4: DX Improvements
- [ ] DevTools para debugging
- [ ] Autocompletado de selectores
- [ ] Validación de reglas en build

---

## 11. Referencias

- [XState](https://xstate.js.org/) - State machines for JS
- [Alpine.js](https://alpinejs.dev/) - Declarative behavior in HTML
- [Stimulus](https://stimulus.hotwired.dev/) - Modest JS framework
- [IFTTT](https://ifttt.com/) - If This Then That pattern
- [Webflow Interactions](https://webflow.com/interactions-animations) - Visual interactions
- [Framer Motion](https://www.framer.com/motion/) - React animation library

