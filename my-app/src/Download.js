
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
import Chart from './chart/chart.js'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDiC2CIGBemOQ9X4u1cbLy0U52qNWpVvss",
    authDomain: "zoombuddy-9b981.firebaseapp.com",
    projectId: "zoombuddy-9b981",
    storageBucket: "zoombuddy-9b981.appspot.com",
    messagingSenderId: "1069464768031",
    appId: "1:1069464768031:web:1f7cbbef40d43ec890cf2a",
    measurementId: "G-YH0JJ8X0Z3"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const axios = require('axios').default;

async function getLink(db, id) {
    const docRef = doc(db, "links", id);
    const link = await getDoc(docRef)

    if (link.exists()) {
        console.log("Document data:", link.data()['data']['chapters']);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    return link.data()['data']['chapters'];
}

{/* U6lmfIAMHuaKNrcJhijk */}

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

export default class Download extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            timelineData: null,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        axios.post('http://localhost:3000/test', {
            url: data.get('url')
        })
    };

    handleTest = async (event) =>  {
        var link
        var id = "U6lmfIAMHuaKNrcJhijk"
        link = await getLink(db, id)
        this.setState({timelineData: link});
    };

    render() {
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
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Zoom url"
                                        name="url"
                                        InputProps={{
                                            style: {color: 'white'}
                                        }}
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

                            <Button variant="text" onClick={this.handleTest}>
                                Test
                            </Button>   

                            <Grid container justifyContent="flex-end">
                            </Grid>
                        </Box>
                    </Box>
                </Container>

                {/* FOOTER */}
                {(this.state.timelineData != null) && (
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Chart />
                    </div >
                )}

    
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

}