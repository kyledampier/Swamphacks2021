
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomChart from './chart/CustomChart.js';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, doc, onSnapshot } from 'firebase/firestore';
import FormatData from './chart/FormatData.js';

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
    const link = await getDoc(docRef);

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
            <Link color="inherit" href="/">
                ZoomBuddy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default class Download extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            timelineData: null,
            docId: null,
            url: '',
            status: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        axios.post('http://3.237.87.112:5000/transcript', {
            zoom_url: data.get('url')
        }).then((res) => {
            console.log(res.data);
            this.setState({
                docId: res.data.id,
            })

            onSnapshot(doc(db, "links", res.data.id), (doc) => {
                console.log("Current data: ", doc.data());
                if (doc.data()['status'] === "Completed") {
                    this.setState({
                        timelineData: doc.data()['data']['chapters'],
                        status: doc.data()['status'],
                    });
                } else {
                    this.setState({
                        status: doc.data()['status'],
                    });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    handleTest = async (event) =>  {
        var link
        var id = "QR2DMbKHexkTFVx98xmS"
        link = await getLink(db, id)
        this.setState({timelineData: link});
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
    
                {/* MAIN BODY */}
    
                <Container component="main" maxWidth="100%">
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
                            <Typography component="p" variant="body1" color="white">
                                Enter the Zoom URL of the meeting you want to download
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="url"
                                hint="Zoom Link"
                                InputProps={{
                                    style: {color: 'black', backgroundColor: '#fff', width: '100%'},
                                }}
                            />
                           
                            
                            {(this.state.status === null) && (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                            )}
                            <Button variant="text" onClick={this.handleTest}>
                                Test
                            </Button>   

                            <br />

                            {(this.state.status !== null && this.state.status !== 'Completed') && (
                                <div>
                            
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress style={{margin: "0 auto"}}/>
                                    </div>
                                    <Typography variant="h5" align="center">
                                        {this.state.status}
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        {"This process may take a couple minute. It will restart if you refresh!"}
                                    </Typography>
                                </div>
                            )}

                            <Grid container justifyContent="flex-end">
                            </Grid>
                        </Box>
                    </Box>
                </Container>

                {/* FOOTER */}
                {(this.state.timelineData != null) && (
                    <div style={{justifyContent:'center', alignItems:'center', width: '90%', margin: '0 auto', marginTop: '10px'}}>
                        <CustomChart timelineData={this.state.timelineData}/>
                        <FormatData timelineData={this.state.timelineData}/>
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