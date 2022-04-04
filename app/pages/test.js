import * as React from "react";
import { Box } from "@mui/system";
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import CustomDrawer from '../frontend/CustomDrawer';

export default function test() {
  return (
    <>
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "primary.main",
            height: "10vh",
            }}
        >
            <AppBar sx={{
              height:'20%',
            }}/>
        </Box>
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "secondary.main",
            height: "90vh",
            }}
        >
        </Box>
    </>
  );
}
