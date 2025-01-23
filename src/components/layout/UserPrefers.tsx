import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { IconButton, Menu, MenuItem, PaletteMode, useTheme } from "@mui/material";
import React from "react";
import { LOCALES, mapLocaleToLanguage } from '../../lib/commons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { usePrefers } from '../../contexts/user-prefers-context';

const UserPrefers = (): React.ReactElement => {
    const router = useRouter();
    const { t } = useTranslation("index")
    const theme = useTheme().palette.mode;

    const [anchorElLanguage, setAnchorElLanguage] = React.useState<null | HTMLElement>(null);


    const { pathname, asPath, query } = router;
    const prefers = usePrefers();

    const handleThemeChange = () => {
        const newTheme: PaletteMode = theme === 'light' ? 'dark' : 'light';
        prefers.switchTheme(newTheme);
    }

    const isLanguageMenuOpen = Boolean(anchorElLanguage);

    const handleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLanguage(event.currentTarget);
    }

    const handleLanguageMenuClose = () => {
        setAnchorElLanguage(null);
    }

    const handleChangeLanguage = (nextLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: nextLocale })
    }
    const languageMenuId = 'language-menu';


    const languageMenu = (
        <Menu
            open={isLanguageMenuOpen}
            id={languageMenuId}
            anchorEl={anchorElLanguage}
            onClose={handleLanguageMenuClose}
        >
            {LOCALES.map((locale, index) => {
                return <MenuItem selected={locale === router.locale} key={index} onClick={() => handleChangeLanguage(locale)}>{t(mapLocaleToLanguage(locale).label)}</MenuItem>
            })}
        </Menu>
    );

    return <>
        <IconButton size="large" aria-label="Light mode" color="inherit" onClick={() => handleThemeChange()}>
            {theme === "light" ? <ModeNightIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton
            size="large"
            aria-label="Change language"
            color="inherit"
            aria-controls={languageMenuId}
            aria-haspopup="true"
            onClick={handleLanguageMenu}
        >
            <LanguageIcon />
        </IconButton>
        {languageMenu}
    </>
}

export default UserPrefers