import * as React from 'react';
import AppBar from "../frontend/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Autocomplete } from '@mui/material';


var test_post = {
  //Situation
  situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. ", 
  //Background
  gender: "Femael", 
  age: "30", 
  height: "160", 
  weight: "60", 
  med_history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Penatibus et magnis dis parturient montes nascetur.", 
  current_treatment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum.", 
  picture_1: "", 
  picture_2: "", 
  picture_3: "", 
  //Assessment
  analysis: "Donec porttitor fermentum porttitor. Donec scelerisque blandit ullamcorper. Donec vehicula purus convallis vestibulum dictum. In accumsan ut orci et feugiat. Donec lacinia sem non faucibus pulvinar. Proin ornare interdum tellus id egestas. Pellentesque at diam velit. Phasellus nec velit lectus. Duis vitae euismod ligula, sed consectetur lacus. Aenean pharetra eros", 
  //Recommendation
  recommendation: "What do I do?", //question
  category:"Lower extremity: Knee",
  tags:  ["leg", "wound"],
  
  
}

/** TODO:
 * - Fixa en stack av images
 *
 */


export default function Post() {
  
  function ShowTags() {
    /*
    return (
      for (x in test_post.tags){
        <Chip label={x}/>
      }
    );*/
    return(
      <Box></Box>
    );
  }


  return(
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar/>
      <Toolbar/>
      <Container sx={{ height:'100%', width:'100%', backgroundColor:'primary.light2',}}>
        
        <Paper elevation={3} sx={{ mt:2, width:'99%', height:'100%', justifyContent: 'center',}}>
        
          <Paper elevation={3} sx={{ height:50, justifyContent: 'center', backgroundColor:'primary.dark'}}>
            
            <Typography sx={{ alignItems:'center', padding:2, color:'white'}} variant="h5" component="div">
              {test_post.situation} 
            </Typography>
          </Paper>
          <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <List
              disablePadding
              sx={{ maxWidth: "sm", width: "90%", }}
            >
              <Typography sx={{ mt: 1}} variant="h6" component="div">
                Situation 
              </Typography>
         
              <Typography sx={{ mt: 1}} variant="subtitle3" component="div">
                {test_post.situation}
              </Typography>
              
              <Typography sx={{ mt: 2, mb:1}} variant="h6" component="div">
                Background 
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4} >
                  <Typography variant="subtitle1" component="div">
                    Gender:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ ml:-4}} variant="subtitle3" component="div">
                    {test_post.gender}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" component="div">
                    Age:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ ml:-6}} variant="subtitle3" component="div">
                    {test_post.age}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" component="div">
                    Height:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ ml:-6}} variant="subtitle3" component="div">
                    {test_post.height} cm
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" component="div">
                    Weight:
                  </Typography>                
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ml:-6, color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}} component="div">
                  {test_post.weight} kg
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle1" sx={{mt:1}} component="div">
                Medical history:
              </Typography>
              <Typography sx={{ mt: 0,}} variant="subtitle3" component="div">
                {test_post.med_history}
              </Typography>
              <Typography sx={{mt:1}} variant="subtitle1" component="div">
                Current Treatment:
              </Typography>
              <Typography sx={{ mt: 0}} variant="subtitle3" component="div">
                {test_post.current_treatment}
              </Typography>

              <Typography sx={{mt:2}} variant="subtitle1" component="div">
                Pictures from pre-operation:
              </Typography>
              <img src="https://loremflickr.com/100/100/medicine" />
              <Box sx={{ml:3, backgroundColor:'rgba(0, 0, 0, 0.2);', height:'100px', width:'100px', mt:-13.4 }}/>
              <Box sx={{ml:1.5, backgroundColor:'rgba(0, 0, 0, 0.1);', height:'100px', width:'100px', mt:-12.3 }}/>
              <Typography sx={{mt:1}} variant="subtitle1" component="div">
                Pictures from during the operation:
              </Typography>
              <img src="https://loremflickr.com/100/100/" />
              <Box sx={{ml:3, backgroundColor:'rgba(0, 0, 0, 0.2);', height:'100px', width:'100px', mt:-13.4 }}/>
              <Box sx={{ml:1.5, backgroundColor:'rgba(0, 0, 0, 0.1);', height:'100px', width:'100px', mt:-12.3 }}/>
              <Typography sx={{mt:1}}  variant="subtitle1" component="div">
                Pictures from post-operation:
              </Typography>
              <img src="https://loremflickr.com/100/100/doctor" />
              <Box sx={{ml:3, backgroundColor:'rgba(0, 0, 0, 0.2);', height:'100px', width:'100px', mt:-13.4 }}/>
              <Box sx={{ml:1.5, backgroundColor:'rgba(0, 0, 0, 0.1);', height:'100px', width:'100px', mt:-12.3 }}/>

              <Typography sx={{ mt: 2}} variant="h6" component="div">
                Assessment 
              </Typography>
              <Typography sx={{ mt: 0}} variant="subtitle3" component="div">
                {test_post.analysis}
              </Typography>
              <Typography sx={{ mt: 2}} variant="h6" component="div">
                Recommendation (question)
              </Typography>
              <Typography variant="subtitle3" component="div">
                {test_post.recommendation}
              </Typography>
              <Typography sx={{ mt: 1}} variant="h6" component="div">
                Case category 
              </Typography>
              <ListItem>
                <Autocomplete
                  id="grouped-demo"
                  name="category"
                  disabled
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label={test_post.category} variant="standard" />
                   )}
                />
              </ListItem>
              <Typography sx={{ mt: 1}} variant="h6" component="div">
                Tags 
              </Typography>
              <ShowTags/>
            </List>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
