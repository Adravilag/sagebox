/**
 * i18n.ts
 * Client-side internationalization helper
 * Updates UI elements with data-i18n attributes based on saved language
 */

const LANG_KEY = 'saged-lang';

type Language = 'es' | 'en';

// Inline translations for client-side use (to avoid import issues)
const translations: Record<Language, Record<string, any>> = {
  es: {
    common: {
      copy: 'Copiar',
      copied: '¡Copiado!',
      code: 'Código',
      search: 'Buscar...',
    },
    nav: {
      components: 'Componentes',
      groups: {
        general: 'General',
        form: 'Formularios',
        feedback: 'Feedback',
        content: 'Contenido',
        utils: 'Utilidades',
      },
      items: {
        button: 'Botón',
        badge: 'Badge',
        icon: 'Icono',
        dropdown: 'Dropdown',
        skeleton: 'Skeleton',
        'article-editor': 'Editor de Artículos',
        'theme-toggle': 'Theme Toggle',
      },
    },
    home: {
      badge: 'Documentación',
      title: 'Componentes',
      description: 'Explora la colección completa de componentes SagedUI. Cada componente está diseñado pensando en accesibilidad, rendimiento y personalización.',
      quickStart: 'Inicio Rápido',
      install: '1. Instalar',
      import: '2. Importar',
      use: '3. Usar',
    },
    stats: {
      components: 'Componentes',
      typescript: 'TypeScript',
      accessible: 'Accesible',
    },
    features: {
      treeShake: 'Tree-shakeable',
      cssVars: 'Variables CSS',
      wcag: 'WCAG 2.1',
      zeroDeps: 'Sin dependencias',
      darkMode: 'Modo oscuro',
      lazyLoad: 'Carga diferida',
    },
    components: {
      button: {
        title: 'Botón',
        description: 'Botón interactivo con múltiples variantes',
        variants: 'Variantes',
        sizes: 'Tamaños',
        states: 'Estados',
      },
      badge: {
        title: 'Badge',
        description: 'Etiqueta visual para estados o contadores',
        colors: 'Variantes',
        sizes: 'Tamaños',
        features: 'Características',
      },
      icon: {
        title: 'Icono',
        description: 'Sistema de iconos SVG optimizado',
        basic: 'Básicos',
        sizes: 'Tamaños',
        colors: 'Colores',
      },
      dropdown: {
        title: 'Dropdown',
        description: 'Menú desplegable con opciones',
        basic: 'Básico',
        position: 'Posición',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'Placeholder de carga',
        text: 'Texto',
        rectangle: 'Rectángulo',
        circle: 'Círculo',
        pulse: 'Animación Pulse',
        variants: 'Variantes',
      },
      editor: {
        title: 'Editor de Artículos',
        description: 'Editor WYSIWYG con soporte Markdown',
        basic: 'Básico',
      },
      themeToggle: {
        title: 'Theme Toggle',
        description: 'Interruptor de tema claro/oscuro',
        default: 'Por defecto',
      },
    },
    labels: {
      viewDocs: 'Ver docs',
      primary: 'Primario',
      secondary: 'Secundario',
      outline: 'Contorno',
      ghost: 'Fantasma',
      danger: 'Peligro',
      small: 'Pequeño',
      medium: 'Mediano',
      large: 'Grande',
      disabled: 'Deshabilitado',
      loading: 'Cargando',
    },
  },
  en: {
    common: {
      copy: 'Copy',
      copied: 'Copied!',
      code: 'Code',
      search: 'Search...',
    },
    nav: {
      components: 'Components',
      groups: {
        general: 'General',
        form: 'Forms',
        feedback: 'Feedback',
        content: 'Content',
        utils: 'Utilities',
      },
      items: {
        button: 'Button',
        badge: 'Badge',
        icon: 'Icon',
        dropdown: 'Dropdown',
        skeleton: 'Skeleton',
        'article-editor': 'Article Editor',
        'theme-toggle': 'Theme Toggle',
      },
    },
    home: {
      badge: 'Documentation',
      title: 'Components',
      description: 'Explore the complete collection of SagedUI components. Each component is designed with accessibility, performance, and customization in mind.',
      quickStart: 'Quick Start',
      install: '1. Install',
      import: '2. Import',
      use: '3. Use',
    },
    stats: {
      components: 'Components',
      typescript: 'TypeScript',
      accessible: 'Accessible',
    },
    features: {
      treeShake: 'Tree-shakeable',
      cssVars: 'CSS Variables',
      wcag: 'WCAG 2.1',
      zeroDeps: 'Zero deps',
      darkMode: 'Dark mode',
      lazyLoad: 'Lazy loading',
    },
    components: {
      button: {
        title: 'Button',
        description: 'Interactive button with multiple variants',
        variants: 'Variants',
        sizes: 'Sizes',
        states: 'States',
      },
      badge: {
        title: 'Badge',
        description: 'Visual label for states or counters',
        colors: 'Variants',
        sizes: 'Sizes',
        features: 'Features',
      },
      icon: {
        title: 'Icon',
        description: 'Optimized SVG icon system',
        basic: 'Basics',
        sizes: 'Sizes',
        colors: 'Colors',
      },
      dropdown: {
        title: 'Dropdown',
        description: 'Dropdown menu with options',
        basic: 'Basic',
        position: 'Position',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'Loading placeholder',
        text: 'Text',
        rectangle: 'Rectangle',
        circle: 'Circle',
        pulse: 'Pulse Animation',
        variants: 'Variants',
      },
      editor: {
        title: 'Article Editor',
        description: 'WYSIWYG editor with Markdown support',
        basic: 'Basic',
      },
      themeToggle: {
        title: 'Theme Toggle',
        description: 'Light/dark theme switch',
        default: 'Default',
      },
    },
    labels: {
      viewDocs: 'View docs',
      primary: 'Primary',
      secondary: 'Secondary',
      outline: 'Outline',
      ghost: 'Ghost',
      danger: 'Danger',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      disabled: 'Disabled',
      loading: 'Loading',
    },
  },
};

// Get current language
export function getCurrentLang(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  } catch {}
  return 'es';
}

// Get translation by path
export function t(path: string, lang?: Language): string {
  const currentLang = lang || getCurrentLang();
  const keys = path.split('.');
  let value: any = translations[currentLang];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path;
    }
  }
  
  return typeof value === 'string' ? value : path;
}

// Update all elements with data-i18n attribute
export function updateI18n() {
  const lang = getCurrentLang();
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.getAttribute('data-i18n');
    if (path) {
      const translated = t(path, lang);
      if (el.hasAttribute('data-i18n-attr')) {
        const attr = el.getAttribute('data-i18n-attr')!;
        el.setAttribute(attr, translated);
      } else {
        el.textContent = translated;
      }
    }
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);
}

// Auto-initialize
if (typeof window !== 'undefined') {
  // Update on page load
  document.addEventListener('DOMContentLoaded', updateI18n);
  
  // Also run immediately if DOM is already loaded
  if (document.readyState !== 'loading') {
    updateI18n();
  }
}
