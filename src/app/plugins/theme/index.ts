import { THEMES } from './themes';
import type { ThemeName, ThemeVars } from './themes';

const STORAGE_KEY = 'app:theme';

export const ThemeManager = {
  list(): ThemeName[]
  {
    return Object.keys(THEMES) as ThemeName[];
  },
  current(): ThemeName
  {
    const v = (typeof localStorage !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) || 'default') : 'default') as ThemeName;
    return (this.list().includes(v) ? v : 'default');
  },
  apply(name: ThemeName)
  {
    const theme = THEMES[name] ?? THEMES.default;
    this._applyVars(theme);
    if (typeof localStorage !== 'undefined')
    {
      localStorage.setItem(STORAGE_KEY, name);
    }
  },
  applyByCasino(casino?: string | null)
  {
    const normalized = (casino || '').toLowerCase();
    const mapped: Record<string, ThemeName> = {
      apuestasroyal: 'apuestasroyal',
      juegaycobra: 'juegaycobra'
    };
    const theme = mapped[normalized] || 'default';
    this.apply(theme);
  },
  restore()
  {
    this.apply(this.current());
  },
  _applyVars(vars: ThemeVars)
  {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  }
};

export type { ThemeName };
