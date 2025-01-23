import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';


import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';

import '../src/components/styles/global.css';
import createEmotionCache from '../src/lib/createEmotionCache';
import { getTheme, PrefersContext, themes, ThemeType } from '../src/contexts/user-prefers-context';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactElement
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

interface MyAppProps extends AppPropsWithLayout {
    emotionCache?: EmotionCache;
    awsSetup: any;
}

const MyApp = (props: MyAppProps) => {

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page)

    const [themeType, setThemeType] = React.useState<ThemeType>('dark');

    const switchTheme = React.useCallback((theme: ThemeType) => {
        setThemeType(theme);
        if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('theme', theme);
    }, []);

    React.useEffect(() => {
        const theme = window.localStorage.getItem('theme') as ThemeType;
        if (themes.includes(theme)) {
            setThemeType(theme);
        }
    }, []);

    const router = useRouter();

    return getLayout(
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
            </Head>
            <ThemeProvider theme={getTheme(themeType, router.locale as string)} >
                <CssBaseline />
                <PrefersContext.Provider value={{ themeType, switchTheme }}>
                    <Component {...pageProps} />
                </PrefersContext.Provider>
            </ThemeProvider>
        </CacheProvider >
    )
}

export default appWithTranslation(MyApp)