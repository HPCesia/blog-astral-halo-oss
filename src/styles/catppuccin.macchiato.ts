import { createCatppuccinPlugin } from '@catppuccin/daisyui';

export default createCatppuccinPlugin(
  'macchiato',
  {
    primary: 'mauve',
    'primary-content': 'mantle',
    secondary: 'lavender',
    'secondary-content': 'mantle',
  },
  {
    prefersdark: true,
  }
);
