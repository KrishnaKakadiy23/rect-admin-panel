import React, { useState } from 'react'
import { useFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Alert, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import CommonService from '../../../commom/CommonService';

// Orelse you can use also Registration.js file



 
const RegistrationForm = ({handleClose}) => {

  const initialValues = {
    name: "",
    difficulty: "" ,
    price:"",
    duration:"",
    maxGroupSize:"",
    summary:""
    };
     


  const [tour, setTour] = useState(initialValues);
  const [error, setError] = useState({
    status:false,
    msg:"",
    type:""
})
 
  const onTextFeildChange = (e) => {
    setTour({
        ...tour,
        [e.target.name] : e.target.value
    });
    console.log(tour);
  }

  const onFormsubmit = async(e) => {
    e.preventDefault();
    if (tour.name && tour.difficulty && tour.price && tour.duration && tour.maxGroupSize && tour.summary) {   
      
      if (tour.difficulty === "easy" || tour.difficulty === "medium" || tour.difficulty === "difficult") {
        
      
          document.getElementById('add-tour-form').reset();
          setError({
              status:"true",
              msg:"New Tour Added Successful!!!",
              type:"success"
          })
         
            CommonService.httpPostRequestBody("http://103.206.139.86:5000/api/v1/tours",JSON.stringify({
        name:tour.name,
        difficulty: tour.difficulty,
        price:tour.price,
        duration:tour.duration,
        maxGroupSize:tour.maxGroupSize,
        summary: tour.summary
      })  , false)
      .then((response) => {
  
        if (response) {
          console.log("successfully added ");
          // toast.info(' Successfully..');
            console.log(response.data.data.tour);
            setTour(response.data.data.tour);
          // navigate('/dashboard', { replace: true }); onClick={(e) => onFormsubmit(e)}  value={tour.name} needed see in RegisterForm.js file
  
        }
      })
    }
    else{
        setError(
          {
            status:"true",
            msg:"You can write only easy ,medium or difficult in difficulty level field",
            type:"error"
          }
        )
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

    
}

    return (
        <div>
        <Grid container justifyContent={"center"} spacing={4}>
            <Grid item xs={12}  >
                <Box textAlign={"center"} p={2} mb={2}  >
                    <Typography variant='h4' >Add New Tour</Typography>
                </Box>
                <form noValidate onSubmit={onFormsubmit} id="add-tour-form">
                    <Grid container spacing={2} pl={1} >
                        <Grid item xs={12}  >
                            <TextField autoComplete='name' name='name' variant='outlined' required fullWidth id='name' label="Tour Name" onChange={(e) => onTextFeildChange(e)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='difficulty' name='difficulty' variant='outlined' required fullWidth id='difficulty' label="Difficulty" onChange={(e) => onTextFeildChange(e)}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='price' type="number" name='price' variant='outlined' required fullWidth id='price' label="Price" onChange={(e) => onTextFeildChange(e)}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='duration' type="number" name='duration' variant='outlined' required fullWidth id='duration' label="Duration" onChange={(e) => onTextFeildChange(e)}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='maxGroupSize' type="number" name='maxGroupSize' variant='outlined' required fullWidth id='maxGroupSize' label="MaxGroupSize" onChange={(e) => onTextFeildChange(e)}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='summary' name='summary' variant='outlined' required fullWidth id='summary' label="Summary" onChange={(e) => onTextFeildChange(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={2}>
                            <Button type='submit' variant='contained' color='primary' style={{marginBottom:25}} fullWidth >Add</Button>
                            <Button type='submit' variant='contained' color='primary' fullWidth onClick={handleClose} >Close</Button>

                    </Box>
                    {
                      error.status ? <Alert sx={{mt:2}} severity={error.type}>{error.msg}</Alert> : ""
                  }
                </form>
            </Grid>
            </Grid>
      </div>
    )
}

export default RegistrationForm;