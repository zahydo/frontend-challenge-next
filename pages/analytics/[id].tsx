import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { Activity, User } from "../../src/interfaces/types";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserServiceClient from "../../src/services/UserService";
import { SSRConfig } from "next-i18next";
import RootLayout from "../../src/components/layout/RootLayout";

type AnalyticsProps = SSRConfig & {
    user: User | null
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
    return (
        <RootLayout>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    User Analytics
                </Typography>

                <Typography variant="h4" component="h2">Profile</Typography>
                <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{user?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{user?.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>{user?.role}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h4" component="h2">Activities</Typography>
                <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user?.activities?.map((activity: Activity, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{activity.type}</TableCell>
                                    <TableCell>{activity.createdAt}</TableCell>
                                    <TableCell>{activity.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </RootLayout>
    );
};

export default Analytics;

export async function getServerSideProps({ res, locale, params }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AnalyticsProps>> {
    const id = params?.id as string;
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    let user: User | null = null;
    try {
        user = await UserServiceClient.getInstance().getUser(id);
    } catch (error) {
        console.error(error);

    }

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "enUS", ['index'])),
            user
        }
    }
}