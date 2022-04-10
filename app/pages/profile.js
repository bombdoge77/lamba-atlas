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
import { useRouter } from 'next/router'


var user = {
  email: "erikaeriksson@mail.com", //string
  name: "Erika Eriksson", //string
  hospital: "Akademiska Hospital", //string
  country: "Norge", //string
  title: "Expert", //string
  bio: "I am from Hell (Norge). Currently working as a plastic surgeon. ", //string
  contact: { whatsapp: "12983767", phone: "12389612" },
  //tex {'whatsapp' : '12983767', 'phone' : '12389612'}
  pass_hash: "123", //string
  //picture?
};

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
  const [editMode, setEditMode] = React.useState(false);

  const router = useRouter()

  const handleEditOpen = () => {
    setEditMode(true);
  };

  const handleSubmit = () => {
    setEditMode(false);

    //Send new profile information to backend
  };

  const handleArrowBack = () => {
    router.back()
  }

  const handlePosts = () => {
    
    // Go to feed and show posts for this user

  }

  function SubmitButton() {
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Submit changes
          </Button>
          <div ref={messagesEndRef} />
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
                {user.name}
              </Box>
              <Box sx={{ fontSize: 14, marginTop: 0, color: "white" }}>
                Title: {user.title}
              </Box>
            </Typography>
          </Container>
        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <List
          disablePadding
          sx={{ maxWidth: "sm", width: "80%", bgcolor: "background.paper" }}
        >
          <ListItem>
            <TextField
              disabled={!editMode}
              id="standard-disabled"
              label="Country"
              defaultValue={user.country}
              variant="standard"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled={!editMode}
              id="standard-disabled"
              label="Hospital"
              defaultValue={user.hospital}
              variant="standard"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled={!editMode}
              id="standard-disabled"
              label="Email"
              defaultValue={user.email}
              variant="standard"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled={!editMode}
              id="standard-disabled"
              label="Phone"
              defaultValue={user.contact.phone}
              variant="standard"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              disabled={!editMode}
              id="standard-disabled"
              label="Bio"
              defaultValue={user.bio}
              variant="standard"
              fullWidth
              multiline
            />
          </ListItem>
        </List>
        <SubmitButton/>
      </Box>
    </Box>
  );
}
