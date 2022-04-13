import * as React from "react";
import { Box } from "@mui/system";
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import CustomDrawer from '../frontend/MobileDrawer';
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from "@mui/material";

export default function test() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Box sx = {{bgcolor:"secondary.main"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={1} sx={{bgcolor:"primary.main"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Grupp 1
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} sx={{bgcolor:"secondary.main"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Grupp 1
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
