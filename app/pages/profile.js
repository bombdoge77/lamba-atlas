import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import AppBar from '../frontend/AppBar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';

var user = {
    'email' : "erikaeriksson@mail.com", //string
    'name' : "Erika Eriksson", //string
    'hospital' : "Akademiska Hospital",  //string
    'country' : "Norge",  //string
    'title' : "Expert",  //string
    'bio' : "I am from Hell (Norge). Currently working as a plastic surgeon. ",  //string
    'contact' : {'whatsapp' : '12983767', 'phone' : '12389612'},  
    //tex {'whatsapp' : '12983767', 'phone' : '12389612'}
    'pass_hash' : "123"  //string
    //picture?
}

export default function Profile() {
  /* const user_placeholder = fetch('api/users/register', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: {
        email: "email",
      }
  })
  .then((res) => res.json())
  .then(data => console.log(data));
  */
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
      <Stack spacing={2}>
        <Toolbar sx={{backgroundColor: 'primary.light', marginBottom:-2.5}}>
            <ArrowBackIcon/>
        </Toolbar>
        <Box
            sx={{
                height: 340,
                backgroundColor: 'primary.dark',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
      
            <Box>
                <Container maxWidth="xs" sx={{marginTop: 5, textAlign: 'center', display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',}}>
                    <Avatar alt="profile picture" 
                    src="/sonic.jpeg" 
                    sx={{ width: 150, height: 150 ,textAlign: 'center'}}
                    />
                </Container>
                <Container sx={{textAlign: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="div">
                        <Box sx={{ fontSize: 22, marginTop: 2, fontWeight: 'bold', color: 'white' }}>
                          {user.name}
                          <IconButton onClick={handleClickOpen}>
                            <EditIcon sx={{color:'secondary.light'}}/>
                          </IconButton>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                          >
                            <Typography>Edit Profile</Typography>                          
                          </Dialog>
                        </Box>
                        <Box sx={{ fontSize: 14, marginTop: 0, m:2, color: 'white'}}>Title: {user.title}</Box>
                        <Box sx={{ fontSize: 12, marginTop: 1, color: 'white'}}>
                            <LocationOnIcon sx={{marginRight:1}}/>
                            Works at {user.hospital} in {user.country}
                        </Box>
                    </Typography>
                </Container>
            </Box>
            
            <Box sx={{height: 380}}>
                <Container sx={{}}>
                    <Typography component="div">
                        <Box sx={{ fontSize: 18, marginTop: 5, fontWeight: 'bold',}}>About {user.name}</Box>
                        <Box sx={{ fontSize: 14, marginTop: 1}}>{user.bio}</Box>
                        <Box sx={{ fontSize: 18, marginTop: 2, fontWeight: 'bold',}}>Contact information</Box>
                        <Box sx={{ fontSize: 14, marginTop: 1}}> <PhoneIcon/> Phone: {user.contact.phone} </Box>
                        <Box sx={{ fontSize: 14, marginTop: 1}}><EmailIcon sx={{}}/> Email: {user.email} </Box>
                    </Typography>
                </Container>
            </Box>
        </Box>
    </Stack>
  );

}