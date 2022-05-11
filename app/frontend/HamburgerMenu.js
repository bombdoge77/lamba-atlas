import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from "@mui/material/Drawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link'

const drawerWidthMobile = "70vw";
const drawerWidthDesktop = "20vw";

export default function HamburgerMenu() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{alignItem:'left'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          MedStack
        </Typography>
      </Toolbar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "primary.light",
            color: "black",
          },
          boxSizing: "border-box"
        }}
        open={open}
      >
        <Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: {sm: 'block' } }}
            >
              MedStack
          </Typography>
          <Box sx={{flexGrow:1}}
          ></Box>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <ArrowBackIcon/>
          </IconButton>
        </Toolbar>
        <Box 
          sx={{
            width: {
              xs: drawerWidthMobile,
              sm: drawerWidthDesktop
            },
            display: 'block',
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem >
                <Link href="/frontpage">
                  <ListItemButton sx={{border:1, borderRadius: 1}}>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/profile">
                  <ListItemButton sx={{border:1, borderRadius: 1}}>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/login">
                  <ListItemButton sx={{border:1, borderRadius: 1}}>
                    <ListItemText primary="Sign out" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
}