// src/config/theme.js — Paleta "Noneconstructor"

export const colors = {
  // Base (fondos)
  bgPrimary:   '#1E1E1E',  // Negro carbón — fondo principal
  bgCard:      '#2A2A2A',  // Gris oscuro — cards / secciones
  bgContainer: '#3A3A3A',  // Gris cemento — divisiones

  // Superficie / UI
  border:      '#4A4A4A',  // Bordes suaves / inputs
  textMuted:   '#6B6B6B',  // Texto secundario / placeholders

  // Color principal (identidad)
  primary:     '#F5A623',  // Naranja obra ⭐

  // Secundarios
  warning:     '#FFC857',  // Amarillo suave — alertas leves
  danger:      '#E4572E',  // Naranja rojizo — acciones importantes
  info:        '#2E86AB',  // Azul acero — datos / contraste

  // Estados
  success:     '#4CAF50',  // Verde — completado
  error:       '#FF3B30',  // Rojo — urgente
  pending:     '#FF9500',  // Naranja — en proceso

  // Texto
  textPrimary:  '#FFFFFF',
  textSecondary:'#B0B0B0',
  textDisabled: '#808080',
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const elevation = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
};
