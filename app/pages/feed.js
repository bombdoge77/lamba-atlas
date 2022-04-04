import AppBar from '../frontend/AppBar';
import Posts from '../frontend/Posts';
import CustomDrawer from '../frontend/CustomDrawer';
import Container from '@mui/material/Container';
import { Box, Toolbar } from '@mui/material';

export default function Feed() {
    return (
      <Box >
        <AppBar />
        <CustomDrawer />
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
    );
  }

