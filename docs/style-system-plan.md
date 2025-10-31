# Modular Style System Implementation Plan

Este documento detalla el plan para implementar un sistema de estilos modular y previsualizable en la aplicación **Infografía**. Abarca el modelado de datos, los componentes de la UI de configuración y los flujos de contenido que soportarán el nuevo sistema de temas y variantes.

## 1. Sistema de diseño base (Theme Packs)

1. **Inventario de tokens actuales**
   - Auditar `index.html` y hojas de estilo asociadas para recopilar los tokens actuales (`--bg`, `--paper`, `--radius`, etc.).
   - Normalizar nombres y agruparlos en categorías: color, tipografía, espaciado, radios y sombras.
2. **Estructura de datos de paquetes de tema**
   - Definir un objeto `ThemePack` en JavaScript con la siguiente forma aproximada:
     ```ts
     type ColorScale = {
       background: string;
       surface: string;
       paper: string;
       textPrimary: string;
       textSecondary: string;
       accent: string;
       accentStrong: string;
     };

     type ThemePack = {
       id: string;
       name: string;
       palette: ColorScale;
       typography: {
         heading: string;
         body: string;
         weightHeading: number;
         weightBody: number;
       };
       spacing: {
         scale: number[]; // p. ej. [4, 8, 12, 16]
         density: 'compact' | 'standard' | 'comfortable';
       };
       radii: {
         none: string;
         sm: string;
         md: string;
         lg: string;
       };
       shadows: string[]; // Tokens tipo `var(--shadow-md)`
     };
     ```
   - Guardar los temas en `theme-packs.ts` o `themes.json` para permitir su carga dinámica.
3. **Consolidación de tokens en CSS**
   - Declarar tokens CSS genéricos basados en el tema activo (`--color-background`, `--radius-md`, etc.).
   - Integrar un mecanismo que actualice `:root` con los valores del `ThemePack` seleccionado.
4. **Comprobador de contraste AA/AAA**
   - Integrar utilitario WCAG (p. ej. `wcag-contrast` o implementación propia) que calcule la relación entre `palette.background` y `palette.textPrimary`.
   - Mostrar avisos en el panel si la relación no cumple AA (4.5:1) o AAA (7:1) según el elemento.

## 2. Modelado conceptual de estilos

1. **Schema de bloque con capas**
   - Definir un tipo `StyledBlock`:
     ```ts
     type BlockKind = 'heading' | 'paragraph' | 'list' | 'quote' | 'media' | string;
     type VariantId = 'surface' | 'elevated' | 'card-outline' | 'dark-solid' | 'tinted' | 'soft-pill' | 'minimal' | 'accent-bar';

     interface BlockStyleOverrides {
       variant?: VariantId;
       accent?: 'primary' | 'secondary' | 'muted' | string;
       decoration?: {
         showBorder?: boolean;
         borderStyle?: string;
         cornerTreatment?: 'sharp' | 'rounded' | 'pill';
       };
     }

     interface StyledBlock {
       id: string;
       kind: BlockKind;
       variant: VariantId;
       accent: string; // Token que mapeará a la paleta del tema
       decoration?: BlockStyleOverrides['decoration'];
       importance: 'default' | 'emphasized' | 'subtle';
       overrides?: Partial<ThemePack> | BlockStyleOverrides;
       content: unknown;
     }
     ```
   - Asegurar que cada bloque pueda heredar del tema activo; sólo se guardarán diferencias en `overrides`.
2. **Biblioteca de plantillas de bloque**
   - Crear catálogo en `block-templates.ts` con configuraciones predeterminadas (p. ej. "Tarjeta suave" = variant `soft-pill`, radius `lg`).
   - Permitir duplicar una plantilla como punto de partida al crear nuevos bloques.

## 3. UX del panel de configuración

1. **Arquitectura de UI**
   - Descomponer el panel lateral en tres secciones con navegación por pestañas o acordeones: "Tema global", "Tipos de contenido" y "Estilo por bloque".
   - Implementar componentes React/Vue (según stack actual; si es vanilla JS, modularizar con web components).
2. **Tema global**
   - Selector de paletas usando `ThemePack` predefinidos; mostrar previsualización en vivo actualizando `:root`.
   - Controles de tipografía (parejas heading/body) y densidad (control slider o botones `compact/standard/comfortable`).
   - Radios: toggles o slider con vista previa de cards ejemplo.
3. **Tipos de contenido**
   - Mostrar lista de `BlockKind` soportados.
   - Para cada tipo, proveer opciones específicas (p. ej. listas con controles de viñetas y espaciado vertical).
   - Guardar preferencias por `kind` en un mapa (`kindStyles[kind]`).
4. **Estilo por bloque**
   - Permitir seleccionar un bloque activo desde el lienzo o panel.
   - Mostrar grid de thumbnails de variantes (`VariantId`), selector de importancia (chips) y acentos (colores).
   - Integrar vista previa miniatura que respete el contenido del bloque y actualice en vivo.
5. **Previsualización sincronizada**
   - Utilizar un store central (p. ej. Zustand, Vuex) para reaccionar a cambios y actualizar tanto el panel como el lienzo.
   - Guardar historial para permitir undo/redo.

## 4. Paletas y tipografías

1. **Catálogo curado**
   - Definir 10-15 objetos `ThemePalette` con nombres inspirados ("Atardecer", "Bosque", etc.).
   - Cada paleta mapeará a tokens `--color-bg`, `--color-surface`, `--color-accent`, etc.
2. **Generador rápido desde color semilla**
   - Implementar utilitario que, a partir de un `seedColor`, genere tonos claros/oscuro usando HSL o librerías (`culori`).
   - Permitir guardar la paleta generada como tema personalizado.
3. **Parejas tipográficas**
   - Seleccionar 6-8 combinaciones `heading/body` (p. ej. `"Playfair Display"` + `"Inter"`).
   - Integrar precarga de fuentes (Google Fonts) y mini vistas previas en el panel.
   - Sincronizar la previsualización con la cabecera y títulos reales del lienzo.

## 5. Listas: detección y formateo

1. **Detección de texto pegado**
   - Escuchar evento de `paste` en el editor; si detecta saltos de línea con prefijos `-`, `•` o `\d+.` ejecutar parser.
   - Mostrar diálogo que sugiera convertir a bloque `kind = 'list'`.
2. **Modelo de datos de listas**
   - `content` en `StyledBlock` almacenará `items: Array<{ text: string; subitems?: Item[] }>`.
   - Mantener metadatos de formato (`bullet: 'disc' | 'decimal' | 'none'`).
3. **Renderizado y controles**
   - Actualizar componentes de visualización para iterar sobre `items` y aplicar viñetas con CSS (`list-style-type`).
   - Implementar control de interlineado, altura máxima y fade en overflow mediante pseudo-elementos.
4. **Soporte futuro de sublistas**
   - Estructurar datos `subitems` pero ocultar controles hasta fase posterior.

## 6. Catálogo de variantes visuales

1. **Definición de parámetros**
   - Crear mapa `variants.ts` con configuración de cada estilo:
     ```ts
     const VARIANTS: Record<VariantId, VariantConfig> = {
       surface: { background: 'var(--color-surface)', border: 'none', shadow: 'none', radius: 'var(--radius-md)', padding: 'var(--space-4)' },
       elevated: { background: 'var(--color-paper)', border: 'none', shadow: 'var(--shadow-lg)', radius: 'var(--radius-lg)', padding: 'var(--space-5)' },
       cardOutline: { background: 'var(--color-surface)', border: '1px solid var(--color-border)', shadow: 'none', radius: 'var(--radius-md)', padding: 'var(--space-4)' },
       darkSolid: { background: 'var(--color-dark)', border: 'none', shadow: 'var(--shadow-md)', radius: 'var(--radius-md)', padding: 'var(--space-4)', text: 'var(--color-on-dark)' },
       tinted: { background: 'color-mix(in srgb, var(--color-accent) 15%, white)', border: 'none', shadow: 'none', radius: 'var(--radius-md)', padding: 'var(--space-4)' },
       softPill: { background: 'color-mix(in srgb, var(--color-accent) 10%, white)', border: 'none', shadow: 'none', radius: '999px', padding: 'var(--space-3) var(--space-5)' },
       minimal: { background: 'transparent', border: 'none', shadow: 'none', radius: '0', padding: 'var(--space-3)' },
       accentBar: { background: 'var(--color-surface)', border: 'none', shadow: 'none', radius: 'var(--radius-sm)', padding: 'var(--space-4)', decoration: { barPosition: 'left', barColor: 'var(--color-accent)' } }
     };
     ```
   - Documentar cada variante en README o Storybook para facilitar su adopción.
2. **Thumbnails interactivos**
   - Renderizar cada variante en miniatura usando el mismo componente de bloque con contenido simulado.
   - Seleccionar una variante actualizará `StyledBlock.variant` y previsualización.

## Próximos pasos

1. **Formalizar estructura de datos**
   - Implementar modelos `ThemePack`, `StyledBlock`, `VariantConfig` en código compartido y cubrir con pruebas unitarias básicas.
2. **Diseñar componentes del panel**
   - Crear prototipos de UI (Figma o Storybook) para validar interacciones.
   - Desarrollar componentes con estados controlados y previsualización en vivo.
3. **Integrar accesibilidad y sobrescrituras**
   - Implementar comprobador de contraste y validaciones WCAG.
   - Añadir lógica de herencia/sobrescritura para bloques y tipos de contenido.

## Consideraciones adicionales

- **Persistencia:** Guardar selección de tema y estilos por bloque en almacenamiento (localStorage o backend) para restaurar sesiones.
- **Internacionalización:** Preparar textos del panel para traducción.
- **Testing:** Crear historias de Storybook para cada variante y pruebas de regresión visual.
- **Performance:** Optimizar actualizaciones usando CSS variables para evitar re-renderizado completo del lienzo.

