import React, { useEffect, useState, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider,styled } from '@mui/material/styles';
import { NoEncryption } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginRoute } from "../utils/APIRoutes";
import { useNavigate} from "react-router-dom";
import { getCookie, setCookie } from "../utils/tools";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://hebenben.com/">
        hebenben
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#FFF',
  border: "none",
  fontSize:"small",
}));

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
      email: "",
      password: "",
  })

  const [randomPic, setRandomPic] = useState({
          name: '',
          url: '',
          link: '',
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    paiseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (getCookie(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
    async function randomFund(){
        let clientId = "Jbzi7QWCuMDHCMh6YvQjArVq_4SpU074WlM6v8DZXrM"
        let endPoint = `https://api.unsplash.com/photos/random/?client_id=${clientId}`;
        fetch(endPoint)
        .then((res) => {
            return res.json();
        })
        .then((jsonData)=>{
            setRandomPic({
              name: jsonData.user.name,
              link: jsonData.user.portfolio_url,
              url: jsonData.urls.regular
            });
        })
    }
    randomFund();
  }, [])
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password} = values;
    if(email === ""){
      toast.error("Emaill is required.", toastOptions);
      return false;
    } else if (password === ""){
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const { data } = await axios.post(LoginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // const userInfo = `{userId: "${data.user._id}",userName: "${data.user.username}"}`
        data.user.avatarImage = "";
        const JsonUser = JSON.stringify(data.user);
        setCookie(process.env.REACT_APP_LOCALHOST_KEY,JsonUser,1);
        navigate("/");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomPic.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          container
          direction="column-reverse"
          justifyContent="space-between"
          alignItems="center"
        >
          <Item> photo by {randomPic.name} on Unsplash</Item>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
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
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}