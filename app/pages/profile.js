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
import editProfileRequest from '../frontend/helper/fetchcalls'


var user = {
  email: "LisaPersson@mail.com", //string
  name: "Lisa Persson", //string
  hospital: "Centralhospital Karlstad", //string
  country: "Sweden", //string
  title: "Specialist doctor in plastic surgery", //string
  bio: "I went to medical school at Umeå university, Umeå, Sweden (2007-2013). After i worked as a AT at Gävle hospital, Gävle, Sweden (2013-2015). I am currently working as a specialist doctor at Centralhospital in Karlstad, Karlstad, Sweden(2015-now).", //string
  contact: { whatsapp: "12983767", phone: "12389612" },
  //tex {'whatsapp' : '12983767', 'phone' : '12389612'}
  pass_hash: "123", //string
  //picture?
};

export default function Profile() {
  const [editMode, setEditMode] = React.useState(false);

  const router = useRouter()

  const handleEditOpen = () => {
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    setEditMode(false);
    const data = new FormData(event.currentTarget);
    console.log(data);
    // SEND NEW INFO TO BACKEND
    //const response = await editProfileRequest(data).then((res) => {return res})
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
              src="/doctoruser.jpg"
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
      <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
