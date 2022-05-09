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
import { isLoggedIn, editProfileRequest, getProfileRequest } from "../frontend/helper/fetchcalls";

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

  const handleEditOpen = () => {
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEditMode(false)
    const data = new FormData(event.currentTarget)
    const result = await editProfileRequest(data)
    console.log(result)
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
      var data = await getProfileRequest()
      var user = data.payload.user_profile
      setLoading(false)
      setUser(user)
    }
  }, []);

  if(loading) {
    return <Box>... loading</Box>
  }
  else {
    return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{display: "flex", backgroundColor: "primary.light" }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ color: "primary.light", maxWidth:340, width: "100%"}}
        >
          <Button fullWidth onClick={handleArrowBack}>
            <ArrowBackIcon />
          </Button>
          <Button fullWidth disabled={editMode} onClick={handleEditOpen}>
            <EditIcon />
            Edit
          </Button>
          <Button fullWidth onClick={handlePosts}>
            <ArticleIcon />
            Posts
          </Button>
        </ButtonGroup>
      </Toolbar>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "block" }}>
          <Container
            maxWidth="xs"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 2,
            }}
          >
            <Avatar
              alt="profile picture"
              src="/sonic.jpeg"
              sx={{ width: 150, height: 150, textAlign: "center" }}
            />
            <EditAvatarButton/>
          </Container>
          <Container
            sx={{
              textAlign: "center",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: 2,
            }}
          >
            <Typography component="div">
              <Box
                sx={{
                  fontSize: 22,
                  marginTop: 2,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {user && user.name}
              </Box>
              <Box sx={{ fontSize: 14, marginTop: 0, color: "white" }}>
                Title: {user && user.title}
              </Box>
            </Typography>
          </Container>
        </Box>
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <List
          disablePadding
          sx={{ maxWidth: "sm", width: "80%", bgcolor: "background.paper" }}
        >
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
        <SubmitButton/>
      </Box>
    </Box> );
  }
}