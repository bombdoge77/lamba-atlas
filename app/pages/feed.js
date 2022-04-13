import AppBar from '../frontend/AppBar';
import Posts from '../frontend/Posts';
import Container from '@mui/material/Container';
import { Box, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default async function Feed() {
  const router = useRouter()

  const jwt = localStorage.getItem('jwt')
  if(jwt != null) {
    await fetch('/auth', {
      method: "GET",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        jwt: jwt
      })
    })
    .then((res) => {
      if(!res.ok){
        router.push('/login')
      }
    }) 
  }

  return (
    <Box >
      <AppBar />
      <Box
        component="main"
        sx={{
          flexGrow:1,
        }}
      >
        <Toolbar/>
        <Posts />
      </Box>
    </Box>
  )
}

