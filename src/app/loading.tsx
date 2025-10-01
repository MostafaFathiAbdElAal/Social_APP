import { Box, CircularProgress } from "@mui/material";

export default function loading() {
    return <section className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    </section>
};

