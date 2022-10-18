import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Box, TextField, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import CommonService from '../../../commom/CommonService';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [error, setError] = useState({
      status:false,
      msg:"",
      type:""
  })
    const [success, setSuccess] = useState(false);
   

// const {register } = useForm();
   const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setError('')
    }, [email,password]);
    
    


  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   email: '',
  //   password: '',
  //   remember: true,
  // };

  // const methods = useForm({
  //   resolver: yupResolver(LoginSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   const valuess = {
  //     email: 'patelraj@gmail.com',
  //     password: 'rajpatel123',
  //   };
  //   CommonService.httpPostRequestBody(`http://103.206.139.86:5000/api/v1/users/login`, valuess, false)
  //   .then((response) => {
  //     console.log("sign in");
  //     if (response) {
  //       console.log(response.data.data.user);
  //       console.log("Successfully Login");
  //       localStorage.setItem('user', JSON.stringify(response.data.data.user));
  //       localStorage.setItem('token', JSON.stringify(response.data.token));
  //       navigate('/dashboard/app', { replace: true });

  //     }
  //   })
  //   .catch((err) => {
  //     console.log("error in login" , err);
  //     // console.log(err.response.data.message);
  //     // alert.info(err.response.data.message);
  //   });

  // };
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (email && password) {   
        document.getElementById('login-form').reset();
        setError({
            status:"true",
            msg:"Login Successfully!!!",
            type:"success"
        })
        setTimeout(() => {

          CommonService.httpPostRequestBody(`http://103.206.139.86:5000/api/v1/users/login`, JSON.stringify({email,password}), false)
          .then((response) => {
            console.log("sign in");
            if (response) {
              console.log(response.data.data.user);
              console.log("Successfully Login");
              localStorage.setItem('user', JSON.stringify(response.data.data.user));
              localStorage.setItem('token', JSON.stringify(response.data.token));
              console.log(response.data.token);
              // navigate('/dashboard/app', { replace: true });
      
            }
          })
            navigate("/dashboard/app")
        }, 3000);
    }
    else{
        console.log("ALll Fields are required");
        setError({
            status:"true",
            msg:"All fields are Required!!!",
            type:"error"
        })
          
    }




    }


  return (
<div> 
    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} >{errMsg}</p>
    <Box component='form' noValidate sx={{mt:1}} id='login-form' onSubmit={handleSubmit} >
    <TextField required fullWidth id='email' margin='normal' ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} name='email' label="Email Address" />
    <TextField required fullWidth id='password'  margin='normal' ref={userRef} onChange={(e) => setPassword(e.target.value)} 
    value={password} 
    type="password"
    name='password' 
    label="Password" 
    />
    <NavLink to="/" >Forgot password?</NavLink>
    <Box textAlign="center" >
        <Button variant='contained' type='submit' sx={{mt:3,mb:2,px:5 , background:"#455a64", ":hover":{
            backgroundColor:"#263238"
        }} } >Login</Button>
    </Box>
    {
      error.status ? <Alert sx={{mt:2}} severity={error.type}>{error.msg}</Alert> : ""
  }
</Box>
</div>
  );
}

