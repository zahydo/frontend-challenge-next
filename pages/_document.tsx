/* eslint-disable @typescript-eslint/no-explicit-any */
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import * as React from 'react';
import createEmotionCache from '../src/lib/createEmotionCache';

export default class MyDocument extends Document {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Html lang="en" key="html">
                <Head>
                    {process.env.NEXT_PUBLIC_GTM_TAG_ID && (
                        <Script
                            strategy="beforeInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_TAG_ID}');
                                `,
                            }}
                        />
                    )}
                    {process.env.NEXT_PUBLIC_GTAG_ID && (
                        <Script
                            strategy="beforeInteractive"
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
                        />
                    )}
                    {process.env.NEXT_PUBLIC_GTAG_ID && (
                        <Script
                            strategy="beforeInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
                                `,
                            }}
                        />
                    )}
                    <meta name="facebook-domain-verification" content="ju4w29nhkexubxnq7ln1ia6xb3c731" />
                    <meta name='msapplication-TileColor' content='#2B5797' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#000000' />
                    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    {process.env.NEXT_PUBLIC_GTM_TAG_ID &&
                        <noscript>
                            <iframe
                                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_TAG_ID}`}
                                height="0"
                                width="0"
                                style={{ display: 'none', visibility: 'hidden' }}
                            ></iframe>
                        </noscript>
                    }
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            // eslint-disable-next-line react/display-name 
            enhanceApp: (App: any) => (props) =>
                <App emotionCache={cache} {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    };
};
