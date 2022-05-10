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
import SearchBar from './SearchBar.js'

const drawerWidthMobile = "70vw";
const drawerWidthDesktop = "20vw";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0,2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function PrimarySearchAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <AppBar 
        position='fixed'
        sx={{ 
          //zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "block",
          float: "none",
          backgroundColor:'primary.white',
          color : 'primary.black'
        }}
        elevation={1}
      >
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
          <SearchBar onSearch={props.onSearch}/>
          {/*<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
            />
          </Search>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "primary.white",
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
                <ListItemButton sx={{border:1, borderRadius: 1}}>
                  <ListItemText primary="Settings" />
                </ListItemButton>
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