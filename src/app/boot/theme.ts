// filepath: /src/app/boot/theme.ts
import { boot } from 'quasar/wrappers';
import { ThemeManager } from '@app/plugins/theme';

export default boot(() => {
  // Restaura el tema guardado al iniciar la app (antes de montar vistas)
  try {
    ThemeManager.restore();
  } catch {
    // fallback seguro
    ThemeManager.apply('default');
  }
});
