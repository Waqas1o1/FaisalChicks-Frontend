import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { connect } from 'react-redux';
import { authSignup } from "../../store/actions/auth";
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Technoventive
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));




function SignUp(props) {
    const classes = useStyles();
    
    const initialFields ={
      email:'',
      username:'',
      password:'',
      password1:'',
      role:'',
    }
    const [fields,setFields] = useState(initialFields);
    
    const handleSubmit = (e) =>{
      e.preventDefalut();
      const reg = {
        username:fields.username,
        email:fields.email,
        password:fields.password,
        role:fields.role
      }
      if (fields.password === fields.password1){
        props.sginup(...reg);
      }
    }
    
      const handleFieldsChange = (e) =>{
      if (e.target.name === 'password1'){
          console.log('');
      }else{
        setFields({
          [e.target.name] : e.target.value
        });
      }
  }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.email}
                  onChange={handleFieldsChange}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.username}
                  onChange={handleFieldsChange}
                  id="username"
                  label="Set UserName"
                  name="username"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.password}
                  onChange={handleFieldsChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password1"
                />
              
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.password1}
                  onChange={handleFieldsChange}
                  name="password1"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                />
              </Grid>
              <Grid xs={12} >
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                      <Select
                        name='role'
                        value={fields.role}
                        onChange={handleFieldsChange}
                      >
                        <MenuItem value={'salesofficer'} >Sales Officer</MenuItem>
                        <MenuItem value={'accountant'}>Accountant</MenuItem>
                      </Select>
                  </FormControl>
              </Grid>            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    );
}
const mapStateToProps = state =>{
  return {
    authenticated: state.token !== null,
    error:state.error,
    loading:state.loading,
  };
}
const mapDispacthToProps = dispacth =>{
  return {
    sginup : (username, email, password, role ) =>
    dispacth(authSignup(username, email, password, role))
  }
}
export default connect(mapStateToProps, mapDispacthToProps)(SignUp);
