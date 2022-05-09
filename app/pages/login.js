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
import { useRouter } from 'next/router'
import { Alert } from '@mui/material';
import { setAccessToken, setUser } from '../frontend/helper/auth'
import { loginRequest } from '../frontend/helper/fetchcalls';

export default function SignIn() {
  const router = useRouter()
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const result = await loginRequest(data)

    if(result) {
      var token = result.headers.get('Authorization')
      setAccessToken(token)
      var body = await result.json()
      setUser(body.user)
      router.push('frontpage')
    }
    else {
      setLoginStatus(false)
    }
  };

  // render alert if false
  const [loginStatus, setLoginStatus] = React.useState(true);

  function RenderAlert() {
    if (!loginStatus) {
      return <Alert severity='error'>Wrong username or password, try again!</Alert>
    }
    else {
      return <Box/>
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <RenderAlert/>
        <Box
          sx={{
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signupconfirmed" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}