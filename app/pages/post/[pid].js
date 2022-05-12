import * as React from 'react';
import AppBar from "../../frontend/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Autocomplete } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { getCommentsRequest, addCommentsRequest, getPostRequest } from '../../frontend/helper/fetchcalls';
import { Fragment } from 'react';
import Authorization from '../../frontend/Authorization';
import { format } from '../../frontend/helper/categories.js'

var test_post = {
  title: "this is the title for the post",
  //Situation
  situation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. ", 
  //Background
  gender: "Female", 
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
  tags:  "leg,wound",
}

var test_comments = [{_id:'000', body:'vada'},{_id:'001', body:'vada'},{_id:'002', body:'vada'}]

/** TODO:
 * - Fixa en stack av images
 * - 
 *
 */

export default function Post() {

  const router = useRouter()
  const [loading, setLoading] = React.useState(true);
  const [post, setPost] = React.useState(test_post);
  const [comments, setComments] = React.useState(test_comments);
  const showtags = post.tags ? (post.tags).split(',').map((tag) =>  <Chip key={tag} label={tag}/>) : null;
  //const [rating, setRating] = React.useState(2);
  
  const handleSubmit = async (event) => {
    const { pid } = router.query
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.append('post_id', pid)
    data.append('user','placeholder')
    data.append('is_reply','placeholder')

    var result = await addCommentsRequest(data)

    if(result == 200) {
      var comments = await getCommentsRequest(pid)
      setComments(comments)
    }
  }

  function Comments() {
    const renderedComments = comments.map((comment) => 
      <ListItem key={comment._id} sx={{display:'block'}}>
        <Typography>
          Comment {comment._id}
        </Typography>
        <Typography>
          {comment.body}
        </Typography>
      </ListItem>
    )
    return (
      renderedComments
    )
  }

  function FetchData() {
    React.useEffect(async () => {
      if(router.isReady){
        const { pid } = router.query
        var post = await getPostRequest(pid)
        setPost(post)
        var comments = await getCommentsRequest(pid)
        setComments(comments)
        setLoading(false)
      }
    }, [router.isReady]);
    return (<>Loading</>)
  }

  return(
    <Authorization>
      {loading
        ? <FetchData/>
        : <Box sx={{ display: "flex", flexDirection: "column" }}>
            <AppBar/>
            <Toolbar/>
            <Container sx={{ height:'100%', width:'100%', backgroundColor:'primary.light2',}}>
              <Paper elevation={3} sx={{ mt:2, width:'99%', height:'100%', justifyContent: 'center',}}>
                <Paper elevation={3} sx={{ height:50, justifyContent: 'center', backgroundColor:'primary.dark', height:'auto'}}>
                  <Typography sx={{ alignItems:'center', padding:2, color:'white',}} variant="h5" component="div">
                    {post.title} 
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
                    <ListItem>
                      <Typography sx={{ mt: 1}} variant="subtitle3" component="div">
                        {post.situation}
                      </Typography>
                    </ListItem>
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
                          {post.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" component="div">
                          Age:
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ ml:-6}} variant="subtitle3" component="div">
                          {post.age}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" component="div">
                          Height:
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ ml:-6}} variant="subtitle3" component="div">
                          {post.height} cm
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" component="div">
                          Weight:
                        </Typography>                
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ml:-6, color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}} component="div">
                        {post.weight} kg
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="subtitle1" sx={{mt:1}} component="div">
                      Medical history:
                    </Typography>
                    <ListItem>
                    <Typography sx={{ mt: 0,}} variant="subtitle3" component="div">
                      {post.med_history}
                    </Typography>
                    </ListItem>
                    <Typography sx={{mt:1}} variant="subtitle1" component="div">
                      Current Treatment:
                    </Typography>
                    <ListItem>
                      <Typography sx={{ mt: 0}} variant="subtitle3" component="div">
                        {post.current_treatment}
                      </Typography> 
                    </ListItem>
                    <Typography sx={{mt:2}} variant="subtitle1" component="div">
                      Pictures from pre-operation:
                    </Typography>
                    <ListItem>
                      <img src="https://loremflickr.com/100/100/medicine" />
                    </ListItem>
                    <Typography sx={{mt:1}} variant="subtitle1" component="div">
                      Pictures from during the operation:
                    </Typography>
                    <ListItem>
                      <img src="https://loremflickr.com/100/100/" />
                    </ListItem>
                    <Typography sx={{mt:1}}  variant="subtitle1" component="div">
                      Pictures from post-operation:
                    </Typography>
                    <ListItem>
                      <img src="https://loremflickr.com/100/100/doctor" />
                    </ListItem>
                    <Typography sx={{ mt: 2}} variant="h6" component="div">
                      Assessment 
                    </Typography>
                    <ListItem>
                      <Typography sx={{ mt: 0}} variant="subtitle3" component="div">
                        {post.analysis}
                      </Typography>
                    </ListItem>
                    <Typography sx={{ mt: 2}} variant="h6" component="div">
                      Recommendation (question)
                    </Typography>
                    <ListItem>
                      <Typography variant="subtitle3" component="div">
                        {post.recommendation}
                      </Typography>
                    </ListItem>
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
                          <TextField {...params} label={post.category} variant="standard" />
                        )}
                      />
                    </ListItem>
                    <Typography sx={{ mt: 1}} variant="h6" component="div">
                      Tags 
                    </Typography>
                    <ListItem>
                      {showtags}
                    </ListItem>
                    <Typography sx={{ mt: 1}} variant="h6" component="div">
                      Consent 
                    </Typography>
                    <ListItem>
                      <Typography sx={{ mt: 1, mb:2, color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}  component="div">
                        I have my patients' consent to use their information in this post.
                      </Typography>
                    </ListItem>
                  </List>
                </Box> 
              </Paper>

              {/* COMMENT SECTION */}
              <Box  sx={{ mt:2, width:'99%', height:'100%', justifyContent: 'center',}}>
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ mt: 1, mb:2}} variant="h5" component="div">
                    Comments 
                  </Typography>
                  <Button variant="contained" sx={{width:100, height:45}} >Add comment</Button>
                  <Box sx={{ minWidth: 50 }}>
                    <FormControl >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sort
                      </InputLabel>
                      <NativeSelect
                        defaultValue={10}
                        inputProps={{
                          name: 'recent',
                        }}
                      >
                        <option value={10}>Most recent</option>
                        <option value={20}>Most Liked</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Stack> 
                {/*
                  <Card sx={{ width: "100%" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "red"}} src="/sonic.jpeg">
                          
                        </Avatar>
                      }
                      title="This is my title to my comment"
                      subheader="September 14, 2016"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newRating) => {
                          setRating(newRating);
                        }}
                      />
                    </IconButton>
                    </CardActions>
                  </Card>*/}
                {comments
                ? <List>
                    <Comments/>
                  </List>
                : <></>
                }
              </Box> 

              <Box component='form' onSubmit={handleSubmit}>
                <TextField name='text' variant='outlined'></TextField>
                <Button variant='contained' type='submit'>Enter</Button>
              </Box>
            </Container>
          </Box>
      }
    </Authorization>
  ); 
}
