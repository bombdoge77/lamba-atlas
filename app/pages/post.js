import * as React from 'react';
import AppBar from "../frontend/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



export default function Post() {



  return(
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar/>
      <Toolbar/>
      <Container sx={{padding:2, backgroundColor:'#e8f5e9',}}>
        <Grid container spacing={2}>
          <Paper elevation={3} sx={{m:2, justifyContent: 'center',}}>
            <Grid item xs={12}>
              <Typography sx={{ mt: 2}} variant="h6" component="div">
                Case #1234 
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}
