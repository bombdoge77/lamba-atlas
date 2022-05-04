import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signUpRequest } from '../frontend/helper/fetchcalls';
import { useRouter } from 'next/router';
import { Snackbar, Alert } from '@mui/material';

export default function SignUp() {
  const router = useRouter()
  const [submitFailed, setSubmitFailed] = React.useState(false)
  const [submitErrorMsg, setSubmitErrorMsg] = React.useState('');

  const validate = (data) => {
    let formKeys = ['name', 'title', 'email', 'country', 'contact', 'hospital', 'bio', 'password']
    for (let i of formKeys) {
      if(data.get(i) == false){
        return false
      }
    }
    if(!data.get('email').includes('@', 1)) {
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isValid = validate(data);

    if(isValid){
      const response = await signUpRequest(data)

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
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}} open={submitFailed}>
        <Alert severity="error"> {submitErrorMsg} </Alert>
      </Snackbar>
      <Box
        sx={{ 
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="contact"
                label="Phone number"
                name="contact"
                autoComplete="contact"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="country"
                name="country"
                required
                fullWidth
                id="country"
                label="Country"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="hospital"
                label="Hospital"
                name="hospital"
                autoComplete="hospital"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="bio"
                label="Biography"
                name="bio"
                autoComplete="bio"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}