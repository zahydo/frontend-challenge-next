import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";
import UserPrefers from "./UserPrefers";
import { ROUTES } from "../../routes";

export default function AppBarMenu(): React.ReactElement {
    return <Box>
        <AppBar color="inherit">
            <Toolbar >   
                <Link href={ROUTES.HOME_PAGE} >
                    HOME
                </Link>
                {" | "}
                <Link href={ROUTES.USERS_PAGE} >
                    USERS
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <UserPrefers />
                </Box>
            </Toolbar>
        </AppBar>
    </Box >;
}