import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import HomeComponent from "../src/components/home/HomeComponent";
import RootLayout from "../src/components/layout/RootLayout";

export default function Home(): React.ReactElement {
    return (
        <RootLayout>
            <HomeComponent />
        </RootLayout>
    );
}

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