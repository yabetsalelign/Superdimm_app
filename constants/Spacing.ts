// SuperDimm Design System — Spacing
// Consistent scale based on a 4px base unit.

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const Radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const Shadow = {
  // Subtle card elevation — matches web app's `shadow-md` style
  card: {
    shadowColor: '#0F1720',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  // Stronger elevation for modals / bottom sheets
  elevated: {
    shadowColor: '#0F1720',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
  // Tab bar shadow
  tabBar: {
    shadowColor: '#0F1720',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
  },
} as const;
