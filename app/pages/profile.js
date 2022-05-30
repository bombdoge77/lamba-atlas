import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { getUser } from "../frontend/helper/auth.js";
import { isLoggedIn, editProfileRequest, getProfileRequest } from "../frontend/helper/fetchcalls";
import { Snackbar, Alert } from "@mui/material";
import HamburgerMenu from "../frontend/HamburgerMenu";
import AppBar from "../frontend/AppBar";
import CircularProgress from '@mui/material/CircularProgress';
import { Paper } from "@mui/material";


var user_test = {
  email: "erikaeriksson@mail.com", //string
  name: "Erika Eriksson", //string
  hospital: "Akademiska Hospital", //string
  country: "Norge", //string
  title: "Expert", //string
  bio: "I am from Hell (Norge). Currently working as a plastic surgeon. ", //string
  contact: "12389612",
  //tex {'whatsapp' : '12983767', 'phone' : '12389612'}
  pass_hash: "123", //string
  //picture?
};

export default function Profile() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [editMode, setEditMode] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const handleClose = () => {
    setSuccess(null);
  };

  const handleEditOpen = () => {
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEditMode(false)
    const data = new FormData(event.currentTarget)
    const result = await editProfileRequest(data)
    if (result) {
      setSuccess(true)
    }
    else {
      setSuccess(false)
    }
  };

  const handleArrowBack = () => {
    router.back()
  }

  const handlePosts = () => {
    // Go to feed and show posts for this user
  }
  
  function SubmitButton() {
    //scroll down to show submit button
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    React.useEffect(scrollToBottom);

    if (editMode) {
      return (
        <Box
          sx={{
            display: "block",
            textAlign: "center",
          }}
        >
          <div ref={messagesEndRef} />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Submit changes
          </Button>
        </Box>
      );
    }
    return(
      <Box/>
    )
  }
  
  function EditAvatarButton() {
    if (editMode) {
      return (
        <Button>
          <input type="file" id="avatar" name="avatar" accept="image/*" />
        </Button>
      )
    }
    return (
      <Box/>
    )
  }

  React.useEffect(async () => {
    var loggedIn = await isLoggedIn()
    if (!loggedIn) {
      router.push('login')
    }
    else {
      var data = await getProfileRequest(getUser())
      var user = data.payload.user_profile
      setLoading(false)
      setUser(user)
    }
  }, []);

  const onSearch = (text) => {
    router.push(`/category/all/all?search=${text}`)
  }

  if(loading) {
    return (
      <Box sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        }}>
        <CircularProgress color="secondary"/>
      </Box>
    )
  }
  else {
    return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
    <AppBar onSearch={onSearch}/>
      <Toolbar/>
      <ButtonGroup
          sx={{ color: "primary.light", width: "100%", height:45}}
        >

          <Button fullWidth disabled={editMode} onClick={handleEditOpen} variant="contained" sx={{color:"white"}}>
            <EditIcon />
            Edit
          </Button>
          <Button fullWidth onClick={handlePosts} variant="contained" sx={{color:"white"}}>
            <ArticleIcon />
            Posts
          </Button>
        </ButtonGroup>
      
      <Snackbar 
          anchorOrigin={{vertical:'top', horizontal:'center'}} 
          sx={{ top: 50}}  
          open={success}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success"> Profile was updated </Alert>
        </Snackbar>
      <Box
        component="form" 
        sx={{
          backgroundColor: "primary.light",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate 
        onSubmit={handleSubmit} 
      >
        <Box sx={{ display: "block" }}>
          <Container
            maxWidth="xs"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 4,
              paddingBottom: 2,
            }}
          >
            <Avatar
              alt="profile picture"
              src="/doctoruser.jpg"
              sx={{ width: 150, height: 150, textAlign: "center" }}
            />
            <EditAvatarButton/>
          </Container>
        </Box>
        <Paper elevation={10} sx={{ mt:2, mb : 8, width:'80%', height:'100%', justifyContent: 'center',}}>
          <List>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="name"
                label="Name"
                defaultValue={user && user.name}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="title"
                label="Title"
                defaultValue={user && user.title}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="country"
                label="Country"
                defaultValue={user && user.country}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="hospital"
                label="Hospital"
                defaultValue={user && user.hospital}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="email"
                label="Email"
                defaultValue={user && user.email}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="contact"
                label="Contact"
                defaultValue={user && user.contact}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            <ListItem>
              <TextField
                disabled={!editMode}
                id="standard-disabled"
                name="bio"
                label="Bio"
                defaultValue={user && user.bio}
                variant="standard"
                fullWidth
                multiline
              />
            </ListItem>
            </List>
          </Paper>
        <SubmitButton/>
      </Box>
    </Box> );
  }
}