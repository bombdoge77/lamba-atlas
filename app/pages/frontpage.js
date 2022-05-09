import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Paper } from "@mui/material";
import AppBar from "../frontend/AppBar";
import Link from 'next/link'
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { isLoggedIn } from "../frontend/helper/fetchcalls";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const paperspecs = 180;

const color = 'secondary.main';
const iconSize = 90;
const textSize = 20;

export default function FrontPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    var loggedIn = await isLoggedIn()
    if (!loggedIn) {
      router.push('login')
    }
    else {
      setLoading(false)
    }
  })

  if (loading) {
    return <Box>... loading</Box>
  } else {
      return(
        <Box>
          <AppBar/>
          <Toolbar/>
          <Container sx={{padding:2, }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link href='/feed'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor: color,
                    height: paperspecs,
                    }} 
                  >
                    {/**Feed */}
                      <StarIcon  
                        sx={{ 
                          fontSize: iconSize, 
                          position: 'relative', 
                          top: 30, 
                          color:'white'}} />
                      <Typography  
                        sx={{ 
                        fontSize: textSize, 
                        position: 'relative', 
                        top: 30,

                        color:'white'}} >
                      Feed
                    </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6} >
              <Link href='/'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor: color,
                    height: paperspecs,
                   }} 
                  >
                    {/**Recent posts */}
                    <AccessTimeIcon  sx={{ fontSize: iconSize, position: 'relative', top: 30, color:'white'}} />
                    <Typography  sx={{ fontSize: textSize, position: 'relative', top: 30, color:'white'}} >
                      Recent posts
                    </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6} >
              <Link href='/'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor: color,
                    height: paperspecs,
                    }} 
                  >
                  {/*Liked posts*/}
                  <ThumbUpIcon  sx={{ fontSize: iconSize, position: 'relative', top: 30, color:'white'}} />
                  <Typography  sx={{ fontSize: textSize, position: 'relative', top: 30, color:'white'}} >
                    Liked posts
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6} >
              <Link href='/'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor: color,
                    height: paperspecs,
                    }} 
                  >
                  {/*Patients*/}
                  <AddIcon  sx={{ fontSize: iconSize, position: 'relative', top: 30, color:'white'}} />
                  <Typography  sx={{ fontSize: textSize, position: 'relative', top: 30, color:'white'}} >
                    New post
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6} >
              <Link href='/'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor:color,
                    height: paperspecs,
                    }} 
                  >
                  {/* */}
                  <FaceIcon  sx={{ fontSize: iconSize, position: 'relative', top: 30, color:'white'}} />
                  <Typography  sx={{ fontSize: textSize, position: 'relative', top: 30, color:'white'}} >
                    Patients
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6} >
              <Link href='/'>
                <Paper 
                  sx={{
                    textAlign: 'center',
                    bgcolor:color,
                    height: paperspecs,
                    }} 
                  >
                  {/**/}

                </Paper>
              </Link>
            </Grid>
          </Grid>
          </Container>
        </Box>
      );
    }

};