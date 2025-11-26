import { createCatppuccinPlugin } from '@catppuccin/daisyui';

export default createCatppuccinPlugin(
  'latte',
  {
    primary: 'teal',
    'primary-content': 'mantle',
    secondary: 'peach',
    'secondary-content': 'mantle',
  },
  {
    default: true,
  }
);
