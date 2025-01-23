import { Container } from "@mui/material";
import AppBarMenu from "./AppBarMenu";

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
    return <>
        <AppBarMenu />
        <Container sx={{ mt: 10 }}>
            {children}
        </Container >
    </>;
}