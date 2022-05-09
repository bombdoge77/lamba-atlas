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
import { newPostRequest } from '../frontend/helper/fetchcalls';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

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

/** TODO: Kolla in senare
 * Tags
 * Infoga fler bilder än en.
 * 
 */

export default function NewPost() {
  
  // receivers är lista med alla tags som fyllts i
  const [receivers, setReceivers] = React.useState([]);
  const [submitFailed, setSubmitFailed] = React.useState(false)
  const [submitErrorMsg, setSubmitErrorMsg] = React.useState('');

  const handleClose = () => {
    setSubmitFailed(false);
  };

  const validate = (data) => {
    for (var value of data.values()) {
      console.log(value);
   }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('tags',receivers)

    const isValid = validate(data)

    if(isValid){
      const response = await newPostRequest(data)

      if(response.ok) {
        router.push('login')
      }
      else {
        setSubmitErrorMsg('Network Error')
        setSubmitFailed(true)
      }
    }
    else {
      setSubmitErrorMsg('Form contains empty fields')
      setSubmitFailed(true)
    }
  }

  /** Saker som vi behöver lagra:
   *  - fallets ID
   *  - situation
   *  - kön
   *  - ålder
   *  - vikt
   *  - längd
   *  - Bilder
   *      - Pre-op
   *      - During-op
   *      - Post-op
   *  - medicinsk bakrund(medical history)
   *  - nuvarande behandling(current treatment)
   *  - aktuell bedömning(Assessment)
   *  - fråga (Recomendation)
   *  - fallets kategori
   *  - taggar(tags)
   *  - att patienten har consentat
   */

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
        <Snackbar 
          anchorOrigin={{vertical:'top', horizontal:'center'}} 
          sx={{ top: 60}}  
          open={submitFailed}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error"> {submitErrorMsg} </Alert>
        </Snackbar>
        <Typography sx={{textAlign:'center', marginTop: 2, marginBottom:2}}>
          Please enter information about your case here! This rapport will follow the SBAR style.
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <List
          disablePadding
          sx={{ maxWidth: "sm", width: "90%", bgcolor: "background.paper" }}
        >
          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Situation 
          </Typography>
          <ListItem>
            <TextField
              name="situation"
              label="Describe your situation"
              variant="filled"
              minRows={2}
              fullWidth
              multiline
            />
          </ListItem>
        <Typography sx={{ mt: 1}} variant="h6" component="div">
            Background
          </Typography>
          <ListItem>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                name="gender" 
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <TextField
              name="age"
              label="Age"
              variant="standard"
              fullWidth
              type="number"
              sx={{ 
                   'input[type=number]': {'MozAppearance': 'textfield'}
                  }}
            />
          </ListItem>
          <ListItem>
            <TextField
              name="weight"
              label="Weight"
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              type="number"
              sx={{ 
                   'input[type=number]': {'MozAppearance': 'textfield'}
                  }}
            />
          </ListItem>
          <ListItem>
            <TextField
              name="height"
              label="Height"
              variant="standard"
              fullWidth
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              sx={{ 
                   'input[type=number]': {'MozAppearance': 'textfield'}
                  }}
            />
          </ListItem>
          <ListItem>
            <TextField
              name="med_history"
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
              name="current_treatment"
              label="Current treatment"
              variant="filled"
              minRows={2}
              fullWidth
              multiline
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
                            <input type="file" id="pic1" name="picture_1" accept="image/*" multiple/>
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
                            <input type="file" id="pic2" name="picture_2" accept="image/*" multiple/>
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
                            <input type="file" id="pic3" name="picture_3" accept="image/*" multiple/>
                          </Button>
                        }
            />
          </ListItem>
          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Assessment
          </Typography>
          <ListItem>
            <TextField
              name="analysis"
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
              name="recommendation"
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
              name="category"
              options={categories}
              groupBy={(option) => option.bodyCategory}
              getOptionLabel={(option) => option.bodyPart}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} name="category" label="With categories" />}
            />
          </ListItem>

          <Typography sx={{ mt: 1}} variant="h6" component="div">
            Tags 
          </Typography>
          <Typography sx={{ mt: 1,color:'rgba(0, 0, 0, 0.6);', fontSize:'1rem',fontWeight: 400}}  component="div">
            Please choose tags that you think relate to your case to help others find the case. Press enter to submit a tag.
          </Typography>
          <ListItem>
            <Autocomplete
              multiple
              fullWidth
              //id="tags-filled"
              options={[]}
              defaultValue={[]}
              freeSolo
              onChange={(e, value) => setReceivers((state) => value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Enter tags"
                  //placeholder="Enter tags"
                  //helperText="Press enter to submit a tag"
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
            <FormControlLabel 
              name="consent"
              control={<Checkbox defaultChecked />} 
              label="I hereby promise i have my patient consent to use their patientdata." 
            />
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