import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Paper } from "@mui/material";
import AppBar from "../frontend/AppBar";
import Link from 'next/link'
import { Box } from "@mui/system";
import { isLoggedIn, getAccessToken } from '../frontend/helper/auth';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { route } from "next/dist/server/router";

const paperspecs = 150;

/*export async function getServerSideProps(context) {

  var accessToken = "hey"

  const user = await fetch("api/users/auth", {
    method: "GET",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": accessToken
    },
  })
  .then((res) => {res.ok ? res.body : null})
  
  var token_decoded = authenticateToken(accessToken)
  var user = token_decoded.user
  //const user = await isLoggedIn()
 
  if(!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {user}, // will be passed to the page component as props
  }
} */

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

  /*
  const accessToken = getAccessToken()
  console.log(accessToken)
  const user = await isLoggedIn()
  const router = useRouter()
  
  if (!user) {
    router.push('/login')
    //return <div></div>
  }
  */
  if (loading) {
    return null
  } else {
    return(  
      <Box>
        <AppBar/>
        <Toolbar/>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Link href="/feed">
            <Paper sx={{m:1,width:paperspecs, height:paperspecs, bgcolor:"lightblue"}}>
              <p>feed</p>
            </Paper>
          </Link>
          <Paper sx={{m:1,width:paperspecs, height:paperspecs, bgcolor:"lightblue"}}>
            <p>test</p>
          </Paper>
        </Box>
      </Box>
    );
    }
};