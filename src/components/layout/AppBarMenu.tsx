import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";
import UserPrefers from "./UserPrefers";
import { ROUTES } from "../../routes";
import { useTranslation } from "next-i18next";

export default function AppBarMenu(): React.ReactElement {
    const { t } = useTranslation("index");
    return <Box>
        <AppBar color="inherit">
            <Toolbar >   
                <Link href={ROUTES.HOME_PAGE} >
                    {t("Home")}
                </Link>
                {" | "}
                <Link href={ROUTES.USERS_PAGE} >
                    {t("Users")}
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <UserPrefers />
                </Box>
            </Toolbar>
        </AppBar>
    </Box >;
}