export const themePacks = [
  {
    id: 'abyssal-blue',
    name: 'Azul Abisal',
    palette: {
      background: '#0e3a5a',
      surface: '#0f2840',
      paper: '#ffffff',
      textPrimary: '#0b1f2c',
      textSecondary: '#4a6478',
      accent: '#2e69a1',
      accentStrong: '#0c3250',
    },
    typography: {
      heading: "'Poppins', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
      weightHeading: 700,
      weightBody: 400,
    },
    spacing: {
      scale: [4, 8, 12, 18, 26, 36],
      density: 'standard',
    },
    radii: {
      none: '0px',
      sm: '8px',
      md: '14px',
      lg: '18px',
    },
    shadows: [
      '0 1px 2px rgba(0, 0, 0, 0.12)',
      '0 10px 30px rgba(0, 0, 0, 0.18)',
      '0 18px 50px rgba(0, 0, 0, 0.25)'
    ],
    grid: {
      columns: 3,
      columnGap: 18,
      rowUnit: 2,
    },
    components: {
      block: {
        background: 'paper-muted',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'auto',
        radius: 'md',
        shadow: 'none',
        paddingToken: 'md',
        darkFillBackground: 'accentStrong',
        darkFillText: 'onAccentStrong',
      },
    },
  },
  {
    id: 'sunrise-sand',
    name: 'Amanecer Arenoso',
    palette: {
      background: '#fef3c7',
      surface: '#f5d399',
      paper: '#fffaf2',
      textPrimary: '#59381d',
      textSecondary: '#7b5230',
      accent: '#f97316',
      accentStrong: '#c2410c',
    },
    typography: {
      heading: "'DM Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      body: "'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      weightHeading: 700,
      weightBody: 400,
    },
    spacing: {
      scale: [4, 8, 12, 20, 28, 40],
      density: 'comfortable',
    },
    radii: {
      none: '0px',
      sm: '6px',
      md: '12px',
      lg: '20px',
    },
    shadows: [
      '0 1px 1px rgba(89, 56, 29, 0.12)',
      '0 6px 18px rgba(201, 134, 52, 0.22)',
      '0 22px 40px rgba(249, 115, 22, 0.18)'
    ],
    grid: {
      columns: 3,
      columnGap: 20,
      rowUnit: 2,
    },
    components: {
      block: {
        background: 'paper-muted',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'auto',
        radius: 'md',
        shadow: 'none',
        paddingToken: 'md',
        darkFillBackground: 'accentStrong',
        darkFillText: 'onAccentStrong',
      },
    },
  },
  {
    id: 'emerald-forest',
    name: 'Bosque Esmeralda',
    palette: {
      background: '#0b3d2e',
      surface: '#135940',
      paper: '#f6fff9',
      textPrimary: '#1a2f26',
      textSecondary: '#3e5c4d',
      accent: '#3ba172',
      accentStrong: '#0f8f5c',
    },
    typography: {
      heading: "'Work Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      body: "'Source Sans Pro', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      weightHeading: 600,
      weightBody: 400,
    },
    spacing: {
      scale: [4, 8, 12, 16, 22, 32],
      density: 'compact',
    },
    radii: {
      none: '0px',
      sm: '6px',
      md: '12px',
      lg: '16px',
    },
    shadows: [
      '0 1px 2px rgba(11, 61, 46, 0.18)',
      '0 10px 24px rgba(19, 89, 64, 0.22)',
      '0 20px 44px rgba(59, 161, 114, 0.28)'
    ],
    grid: {
      columns: 3,
      columnGap: 16,
      rowUnit: 2,
    },
    components: {
      block: {
        background: 'paper-muted',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'auto',
        radius: 'md',
        shadow: 'none',
        paddingToken: 'md',
        darkFillBackground: 'accentStrong',
        darkFillText: 'onAccentStrong',
      },
    },
  }
];

export const defaultThemeId = 'abyssal-blue';
