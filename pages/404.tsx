/* eslint-disable @typescript-eslint/no-explicit-any */

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';


import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Link from 'next/link';


const Index = (): React.ReactElement => {
    const { t } = useTranslation("index");
    return (
        <>
            <Container>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item>
                        <Typography variant="h1" component="h1" align='center'>
                            404
                        </Typography>
                        <Typography variant="body1" component="h2" align='center'>
                            {t("Oops! this page doesn't exist yet")}
                        </Typography>
                        <Typography variant="overline" component="p" align='center'>
                            <Link color="inherit" href={"/"} >{t("Go Home")}</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Index

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['index'])),
            // Will be passed to the page component as props
        },
    };
}