import { createTheme, PaletteMode, Theme } from '@mui/material';
import * as locales from '@mui/material/locale';
import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE } from '../lib/commons';

export const themes = ['light', 'dark'] as const;
export type ThemeType = PaletteMode;
export type SupportedLocales = keyof typeof locales;

export const getLocale = (routerLocale: string | undefined): SupportedLocales => {
    // es-CO is not supported by MUI so we use esES instead.
    if(routerLocale !== undefined && routerLocale === DEFAULT_LOCALE) {
        return 'esES'
    } else {
        return 'enUS'
    }
}

interface Prefers {
  themeType: ThemeType;
  switchTheme: (type: ThemeType) => void;
}

export const PrefersContext = createContext<Prefers>({
  themeType: 'dark',
  switchTheme: () => {}
});

export const usePrefers = (): Prefers => useContext(PrefersContext);

// Creates a theme instance.
export const getTheme = (themeType: PaletteMode, locale:  string): Theme => {
    const theme: Theme = createTheme({
        palette: {
            mode: themeType
        },
        typography: {
            fontFamily: 'Quicksand',
        }
    }, locales[getLocale(locale)]);
    return theme
}