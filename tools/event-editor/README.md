# Event Editor - SageBox

Editor visual para configurar eventos en componentes SageBox utilizando el patrón **ECA** (Event-Condition-Action).

## Concepto

El Event Editor permite crear reglas de comportamiento para los Web Components de SageBox siguiendo tres pasos:

1. **Acontecimiento (Event)**: El evento que dispara la regla (click, change, open, close, etc.)
2. **Condición (Condition)**: Validación opcional antes de ejecutar la acción
3. **Acción (Action)**: Lo que sucede cuando se cumple la condición

## Características

- 🎯 **Visual Rule Builder**: Interfaz drag & drop para crear reglas
- 🔗 **Encadenamiento**: Múltiples condiciones y acciones por evento
- 📝 **Código generado**: Exporta JavaScript/TypeScript vanilla
- 🧪 **Preview en vivo**: Prueba las reglas en tiempo real
- 📚 **Biblioteca de acciones**: Acciones predefinidas comunes

## Uso

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview de producción
npm run preview
```

## Estructura de una Regla

```typescript
interface EventRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    component: string;      // sg-button, sg-dropdown, etc.
    event: string;          // sgClick, sgOpen, sgClose, etc.
    selector?: string;      // Selector CSS opcional
  };
  conditions: Condition[];  // Array de condiciones (AND/OR)
  actions: Action[];        // Acciones a ejecutar
}

interface Condition {
  type: 'property' | 'state' | 'custom';
  target: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
}

interface Action {
  type: 'setAttribute' | 'toggleClass' | 'emit' | 'call' | 'navigate' | 'custom';
  target: string;
  params: Record<string, any>;
}
```

## Eventos Soportados por Componente

### sg-button
- `sgClick` - Click en el botón

### sg-dropdown
- `sgOpen` - El dropdown se abre
- `sgClose` - El dropdown se cierra

### sg-modal
- `sgOpen` - El modal se abre
- `sgClose` - El modal se cierra
- `sgCancel` - El usuario cancela

### sg-select
- `sgChange` - Cambia la selección
- `sgSearch` - Se busca en el select

### sg-input
- `sgInput` - Cambio en el input
- `sgFocus` - Input recibe foco
- `sgBlur` - Input pierde foco

## Puerto

El servidor se ejecuta en el puerto **4570** por defecto.
