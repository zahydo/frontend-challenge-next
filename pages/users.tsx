/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import RootLayout from '../src/components/layout/RootLayout';
import HomeComponent from '../src/components/home/Home';


interface HomePageProps {
    entry: null;
}

const HomePage = (): React.ReactElement => {

    return (
        <>
            <RootLayout>
                <HomeComponent />
            </RootLayout>
        </>
    );
}

export default HomePage

export async function getServerSideProps({ res, locale }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "enUS", ['index'])),
            entry: null
        },
    }
}