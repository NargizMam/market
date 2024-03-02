import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RegisterMutation } from '../types';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerUser } from './usersThunk';
import { selectRegisterError } from './usersSlice';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";


const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phoneNumber: ''
  });
  const getFieldError = (fieldName: string) => {
    try{
      return error?.errors[fieldName].message;
    }catch {
      return undefined;
    }
  };
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registerUser(state)).unwrap();
      navigate('/');
    }
    catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        {error && (<Alert variant="filled" severity="error">Erorr !!!</Alert>)}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form"  onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  name="displayName"
                  label="Display name"
                  type="displayName"
                  value={state.displayName}
                  onChange={inputChangeHandler}
                  autoComplete="new-displayName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  name="phoneNumber"
                  label="Phone number"
                  type="text"
                  value={state.phoneNumber}
                  onChange={inputChangeHandler}
                  autoComplete="new-phoneNumber"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Register;