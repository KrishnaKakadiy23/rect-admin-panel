import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Box, TextField, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import CommonService from '../../../commom/CommonService';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [error, setError] = useState({
    status:false,
    msg:"",
    type:""
})
  // const [showPassword, setShowPassword] = useState(false);

  // const RegisterSchema = Yup.object().shape({
  //   Name: Yup.string().required(' name required'),
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  //   confirmpassword: Yup.string().required('Confirm Password is required')

  // });

  // const defaultValues = {
  //   Name: '',
  //   email: '',
  //   password: '',
  //   confirmpassword:''
  // };

  // const methods = useForm({
  //   resolver: yupResolver(RegisterSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (email && password && name && passwordConfirm) {   
        if (password.length >= 8 && passwordConfirm.length >= 8 ) {
          if (password === passwordConfirm  )   {
            
            document.getElementById('register-form').reset();
            setError({
                status:"true",
                msg:"Register Successful!!!",
                type:"success"
            })
            setTimeout(() => {
              CommonService.httpPostRequestBody("http://103.206.139.86:5000/api/v1/users/signup",JSON.stringify({
                name,email,password,passwordConfirm
              })  , false)
              .then((response) => {
          
                if (response) {
                  console.log("successfully register");
                  // toast.info(' Successfully..');
                  localStorage.setItem('user', JSON.stringify(response.data.data.user));
                  localStorage.setItem('token', JSON.stringify(response.data.token));
                  console.log(response.data.token);
                  // navigate('/dashboard', { replace: true });
          
                }
              })

                navigate("/login");
            }, 3000);
        }else{
          setError({
              status:"true",
              msg:"Password and confirm Password must be same",
              type:"error"
          })
      }
        }
        else{
          setError({
            status:"true",
            msg:"Password and confirm Password must min 8 character",
            type:"error"
          })
        }
       
        

    }
    else{
        console.log("ALll Fields are required");
        setError({
            status:"true",
            msg:"All fields are Required!!!",
            type:"error"
        })
    }
  

  };

  return (
    <Box component='form' noValidate sx={{mt:1}} id='register-form' onSubmit={handleSubmit}>
        <TextField required fullWidth id='name' margin='normal' ref={userRef} onChange={(e) => setName(e.target.value)} value={name} name='name' label="User Name"  />
        <TextField required fullWidth id='email' margin='normal' name='email'  ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} label="Email Address"  />
        <TextField required fullWidth id='password' margin='normal' type='password' InputProps={{ inputProps: { minLength: 10, maxLength: 10 } }} ref={userRef} onChange={(e) => setPassword(e.target.value)} value={password}  name='password' label="Password"  />
        <TextField required fullWidth id='passwordConfirm' margin='normal' type='password' name='passwordConfirm' InputProps={{ inputProps: { minLength: 10, maxLength: 10 } }}  onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm}  ref={userRef} label="Confirm Password" />
        <Box textAlign="center" >
                <Button variant='contained' type='submit' sx={{mt:3,mb:2,px:5 , background:"#455a64", ":hover":{
                    backgroundColor:"#263238"
                }} } >Register</Button>
            </Box>
            {
                error.status ? <Alert sx={{mt:2}} severity={error.type}>{error.msg}</Alert> : ""
            }
    </Box>
  );
}
