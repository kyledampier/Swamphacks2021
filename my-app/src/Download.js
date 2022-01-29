
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const theme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ZoomBuddy.app/">
                ZoomBuddy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Download() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            url: data.get('url'),
        });
    };

    return (
        <ThemeProvider theme={theme}>

            {/* MAIN BODY */}

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 25,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h1" color="white">
                        ZoomBuddy
                    </Typography>

                    <Typography component="h1" variant="h5" color="white">
                        Take your studying to the next level
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="standard-basic"
                                    variant="standard"
                                    label="Zoom url"
                                    name="url"
                                    autoComplete="url"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </Box>
                </Box>
            </Container>

            {/* FOOTER */}

            <Box sx={{  p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    {'Shoutout: '}
                    <Link color="inherit" href="https://zoom.us/">
                        Zoom
                    </Link>{', '}
                    <Link color="inherit" href="https://github.com/Battleman/zoomdl">
                        ZoomDL
                    </Link>{', '}
                    <Link color="inherit" href="https://www.assemblyai.com/">
                        AssemblyAI
                    </Link>
                    {' for their tools and help!'}                       
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Made with ❤️ by Kyle Dampier and Justin Ho for Swamphacks 2022
                </Typography>
                <Copyright />
            </Box>

        </ThemeProvider>

    );
}