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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Edit from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

var user = {
  'email': "erikaeriksson@mail.com", //string
  'name': "Erika Eriksson", //string
  'hospital': "Akademiska Hospital",  //string
  'country': "Norge",  //string
  'title': "Expert",  //string
  'bio': "I am from Hell (Norge). Currently working as a plastic surgeon. ",  //string
  'contact': { 'whatsapp': '12983767', 'phone': '12389612' },
  //tex {'whatsapp' : '12983767', 'phone' : '12389612'}
  'pass_hash': "123"  //string
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
  const [openEdit, setOpenEdit] = React.useState(true);

  const handleEditOpen = () => {
    setOpenEdit(false);
  };

  const handleEditClose = () => {
    setOpenEdit(true);
  };
  
  function SubmitButton() {
    if (!openEdit) {
      return (
        <Box sx={{
          display:'block',  
          textAlign: 'center',}}
        >
          <Button onClick={handleEditClose} variant="contained" sx={{ mt: 2, mb: 2 }}>
              Submit changes
          </Button>
        </Box>
      )
    } 
    return <Box/>;}
 

  return (
    <Box sx={{display: 'flex', flexDirection:'column'}}>
      <Toolbar sx={{ display: 'flex', backgroundColor: 'primary.light'}}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" 
        sx={{color:'primary.light',
            minWidth:340,
            }}
        >
          <Button fullWidth="true"><ArrowBackIcon /></Button>
          <Button fullWidth="true" disabled={!openEdit} onClick={handleEditOpen}><EditIcon />Edit</Button>
          <Button fullWidth="true"><ArticleIcon/>Post</Button>
        </ButtonGroup>
      </Toolbar>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{display:'block'}}> 
          <Container maxWidth="xs" sx={{
            textAlign: 'center', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop:2
          }}>
            <Avatar alt="profile picture"
              src="/sonic.jpeg"
              sx={{ width: 150, height: 150, textAlign: 'center' }}
            />
            <Box hidden={true}>
              <Button>
                <input type="file" id="avatar" name="avatar" accept="image/*"/>
              </Button>
            </Box>
          </Container>
          <Container sx={{ 
            textAlign: 'center', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom:2 }}>
            <Typography component="div">
              <Box sx={{ fontSize: 22, marginTop: 2, fontWeight: 'bold', color: 'white' }}>
                {user.name}
              </Box>
              <Box sx={{ fontSize: 14, marginTop: 0, color: 'white' }}>Title: {user.title}</Box>
            </Typography>
          </Container>
        </Box>
      </Box>
      <Box sx={{display:'block'}}> 
        <List disablePadding disable sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <TextField
              disabled = {openEdit}
              id="standard-disabled"
              label="Country"
              defaultValue={user.country}
              variant="standard"
              fullWidth="true"
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled = {openEdit}
              id="standard-disabled"
              label="Hospital"
              defaultValue={user.hospital}
              variant="standard"
              fullWidth="true"
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled = {openEdit}
              id="standard-disabled"
              label="Email"
              defaultValue={user.email}
              variant="standard"
              fullWidth="true"
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled = {openEdit}
              id="standard-disabled"
              label="Phone"
              defaultValue={user.contact.phone}
              variant="standard"
              fullWidth="true"
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled = {openEdit}
              id="standard-disabled"
              label="Bio"
              defaultValue={user.bio}
              variant="standard"
              fullWidth="true"
              multiline
            />
          </ListItem>
        </List>
        <SubmitButton/>
      </Box>
    </Box>
  );
}