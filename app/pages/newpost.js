import * as React from 'react';

import AppBar from "../frontend/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Autocomplete } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const categories =[
                    {bodyCategory: "Upper extremity", bodyPart: "Shoulder + upper arm"}, 
                    {bodyCategory:"Upper extremity", bodyPart:"Elbow"}, 
                    {bodyCategory:"Upper extremity", bodyPart: "Forearm"}, 
                    {bodyCategory:"Upper extremity", bodyPart: "Hand" },
                    {bodyCategory:"Lower extremity", bodyPart: "Hip + thigh"}, 
                    {bodyCategory:"Lower extremity", bodyPart:"Knee"}, 
                    {bodyCategory:"Lower extremity", bodyPart: "Lower leg"}, 
                    {bodyCategory:"Lower extremity", bodyPart: "Foot" },
                    {bodyCategory:"Abdomen", bodyPart: "Front"}, 
                    {bodyCategory:"Abdomen", bodyPart: "Back" },

                  ]

export default function NewPost() {

  const [chipData, setchipData] = React.useState([]);
  const [receivers, setReceivers] = React.useState([]);
  console.log(receivers);
  
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    //tmp = event.target.value

  };

  const handleSubmit = 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar/>
      <Toolbar/>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{textAlign:'center', marginTop: 2, marginBottom:2}}>
          Please enter information about your case here! This rapport will follow the SBAR style.
        </Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <List
          disablePadding
          sx={{ maxWidth: "sm", width: "90%", bgcolor: "background.paper" }}
        >
          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Situation 
          </Typography>
          <ListItem>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <TextField
              id="standard-disabled"
              label="Age"
              variant="standard"
              fullWidth
              type="number"
              sx={{ 
                   'input[type=number]': {'-moz-appearance': 'textfield'}
                  }}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="standard-disabled"
              label="Weight"
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              type="number"
              sx={{ 
                   'input[type=number]': {'-moz-appearance': 'textfield'}
                  }}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="standard-disabled"
              label="Height"
              variant="standard"
              fullWidth
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              sx={{ 
                   'input[type=number]': {'-moz-appearance': 'textfield'}
                  }}
            />
          </ListItem>
          <Typography sx={{ mt: 1,color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}  component="div">
            Please add the pictures that are relevant to the case.
          </Typography>
          <ListItem>
          
            <ListItemText
              primary="Pictures pre-operation"
              primaryTypographyProps={{color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}
              secondary={
                          <Button>
                            <input type="file" id="pic1" name="avatar" accept="image/*" />
                          </Button>
                        }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Pictures during operation"
              primaryTypographyProps={{color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}
              secondary={
                          <Button>
                            <input type="file" id="pic2" name="avatar" accept="image/*" />
                          </Button>
                        }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Pictures post-operation"
              primaryTypographyProps={{color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}
              secondary={
                          <Button>
                            <input type="file" id="pic3" name="avatar" accept="image/*" />
                          </Button>
                        }
            />
          </ListItem>
        <Typography sx={{ mt: 1}} variant="h6" component="div">
            Background
          </Typography>
          <ListItem>
            <TextField
              label="Medical history"
              variant="filled"
              fullWidth
              multiline
              minRows={2}
              maxRows={8}
              helperText="Brief information related to the situation"
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Current treatment"
              variant="filled"
              minRows={2}
              fullWidth
              multiline
            />
          </ListItem>
          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Assessment
          </Typography>
          <ListItem>
            <TextField
              label="Analysis and considerations of options"
              variant="filled"
              fullWidth
              multiline
              minRows={2}
              maxRows={8}
            />
          </ListItem>
          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Recommendation 
          </Typography>
          <ListItem>
            <TextField
              label="Your question"
              variant="filled"
              fullWidth
              minRows={2}
              multiline
              helperText="What you want helpt with"
            />
          </ListItem>

          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Case category 
          </Typography>
          <ListItem>
          <Autocomplete
            id="grouped-demo"
            options={categories}
            groupBy={(option) => option.bodyCategory}
            getOptionLabel={(option) => option.bodyPart}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="With categories" />}
          />
          </ListItem>

          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Tags 
          </Typography>
          <Typography sx={{ mt: 1,color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}  component="div">
            Please choose tags that you think relate to your case to help others find the case. 
          </Typography>
          
          <ListItem>
          <Autocomplete
            multiple
            fullWidth
            id="tags-filled"
            options={[]}
            defaultValue={[]}
            freeSolo
            onChange={(e, value) => setReceivers((state) => value)}
            renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Enter tags"
                  placeholder="Enter tags"
                />
              )}
          />
          </ListItem>

          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Consent from patient
          </Typography>
          <Typography sx={{ mt: 1,color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}  component="div">
            You must have your patient's consent to use their information in educational purpose. 
            Please make sure your patient have consented by filling our the consentform: [Insert link to consent document].
          </Typography>
          <ListItem>
            <FormControlLabel control={<Checkbox defaultChecked />} label="I hereby promise i have my patient consent to use their patientdata." />
          </ListItem>
          <Box
          sx={{
            display: "block",
            textAlign: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            //onSubmit={handleSubmit}
          >
            Submit post
          </Button>
        </Box>
        </List>
      </Box>
    </Box>
  );
}