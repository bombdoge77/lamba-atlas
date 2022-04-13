import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Paper } from "@mui/material";
import AppBar from "../frontend/AppBar";
import Link from 'next/link'
import { Box } from "@mui/system";

const paperspecs = 150;

export default function FrontPage(){
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
};