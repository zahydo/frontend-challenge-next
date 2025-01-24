/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import RootLayout from '../src/components/layout/RootLayout';
import UsersManagement from '../src/components/users/UsersManagement';
import { SSRConfig } from 'next-i18next';


const UserDashboardPage = (): React.ReactElement => {

    return (
        <>
            <RootLayout>
                <UsersManagement />
            </RootLayout>
        </>
    );
}

export default UserDashboardPage

export async function getServerSideProps({ res, locale }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SSRConfig>> {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "enUS", ['index']))
        },
    }
}