import React, { useState } from 'react'
import { useFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import CommonService from '../../../commom/CommonService';

// Orelse you can use also Registration.js file


const initialValues = {
    name: "",
    trips:""
  };
  const error = {
        color : "#b22b27"
  }


   
  const btnStyle = { marginTop: 10 , 
                    alignItems: "end" }
const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    trips: Yup.string().required("Please Enter number of trips")
  });

 
const RegistrationForm = () => {

  const [user, setUser] = useState(initialValues);
  const postApi =(`https://api.instantwebtools.net/v1/passenger`,user)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        setUser({
          ...user,
          values
        })
        console.log( "values",values);
        action.resetForm();
      },
    });

  console.log("Error",errors);
    return (
        <div>
        <div className="container">
        <div className="modal">
          <div className="modal-container">
              <form onSubmit={handleSubmit}>
                <TextField 
                     type="name"
                    autoComplete="off"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    fullWidth
                />
                  {errors.name && touched.name ? (
                    <p className="form-error" style={error}>{errors.name}</p>
                  ) : null}
                  
                  <TextField 
                    type="number"
                    autoComplete="off"
                    name="trips"
                    id="trips"
                    placeholder="Trip"
                    value={values.trips}
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    fullWidth
                    style={{marginTop: 10}}
                />
                  {errors.trips && touched.trips ? (
                    <p className="form-error" style={error}>{errors.trips}</p>
                  ) : null}
                  

                
                  <Button type='submit' style={btnStyle} variant='contained'
                  color='primary'>Add</Button>

            
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default RegistrationForm;