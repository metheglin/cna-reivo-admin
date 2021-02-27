import React, { useState } from 'react';
import {useRouter} from 'next/router'
// import SignIn from 'components/organisms/SignIn'
import Api from 'modules/rvadmin/utils/Api'
import AccessToken from 'modules/rvadmin/utils/AccessToken'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const signin = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const {handleApiError} = useFlash()
  const router = useRouter()

  const signIn = (login, password) => {
    Api.json({handleApiError}).fetch('/authenticate', {
      method: "POST",
      body: {login, password},
    }).then(response=>{
      // console.log('aaa', response)
      const token = response.data
      AccessToken.setToken( token )
      router.push('/att/permissions')
    })
  }

  return (
    <div>
      <SignIn
        login={login}
        password={password}
        setLogin={setLogin}
        setPassword={setPassword}
        handleSignIn={()=>signIn(login, password)} />
    </div>
  )
}
export default signin

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({
  login, password, setLogin, setPassword, handleSignIn
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          サインイン
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={login}
            onChange={(e)=>setLogin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {/*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            サインイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot_password" variant="body2">
                パスワードを忘れましたか?
              </Link>
            </Grid>
            {/*<Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>*/}
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
