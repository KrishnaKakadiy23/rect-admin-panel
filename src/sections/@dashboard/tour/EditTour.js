import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommonService from '../../../commom/CommonService';

const EditTour = () => {
   const {_id} = useParams();
    const navigate = useNavigate();
   const [tour, setTour] = useState({
    name: "",
    difficulty: "" ,
    price:"",
    duration:"",
    maxGroupSize: "",
    summary:""
});

useEffect(() => {
    getStudentdata();
  }, [_id]);

  const onTextFeildChange = (e) => {
    setTour({
        ...tour,
        [e.target.name] : e.target.value
    });
    console.log(tour);
  }

const getStudentdata = async() => {
    try {
        CommonService.httpGet(`http://103.206.139.86:5000/api/v1/tours/${_id}`,true).then((response) => {
            //  console.log(response.data);  
            // console.log("results",response.data.results);  
                console.log(response.data.data.tour);
                // console.log(response.data.data.tour.name);
                setTour(response.data.data.tour);
                // setToursCount(response.data.results);
                console.log("in api...");
          })
            
    } catch (error) {
        console.log("error",error);
    }
  }

  const onFormsubmit = async(e) => {
    e.preventDefault();
    try {
        CommonService.httpPatchRequestBody(`http://103.206.139.86:5000/api/v1/tours/${_id}`,JSON.stringify({
           name:tour.name ,difficulty: tour.difficulty , price: tour.price, summary: tour.summary
          }),false).then((response) => {
            //  console.log(response.data);  
            // console.log("results",response.data.results);  
                console.log(response.data.data.tour);
                console.log("Update tour detail");
                navigate("/dashboard/tour")
                // console.log(response.data.data.tour.name);
                // setTourData(response.data.data.tour);
                // setToursCount(response.data.results);
                console.log("in api...");
          })
  } catch (error) {
    console.log("error",error);
  }
  }
  

  const handleClick = () => {
    navigate("/dashboard/tour");
  }

  return (
    <div>
        EDit Tour
             <Grid container justifyContent={"center"} spacing={4}>
        <Grid item md={6} xs={12}>
          <Box
            textAlign={"center"}
            p={2}
            mb={2}
           
          >
            <Typography variant="h4">Edit Tour Detail</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  value={_id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Tour Name"
                  onChange={(e) => onTextFeildChange(e)}
                  value={tour.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="difficulty"
                  name="difficulty"
                  variant="outlined"
                  required
                  fullWidth
                  id="difficulty"
                  label="Difficulty"
                  onChange={(e) => onTextFeildChange(e)}
                  value={tour.difficulty}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                autoComplete="price"
                name="price"
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                onChange={(e) => onTextFeildChange(e)}
                value={tour.price}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              autoComplete="duration"
              name="duration"
              variant="outlined"
              required
              fullWidth
              id="duration"
              label="Duration"
              onChange={(e) => onTextFeildChange(e)}
              value={tour.duration}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            autoComplete="maxGroupSize"
            name="maxGroupSize"
            variant="outlined"
            required
            fullWidth
            id="maxGroupSize"
            label="MaxGroupSize"
            onChange={(e) => onTextFeildChange(e)}
            value={tour.maxGroupSize}
          />
        </Grid>
            <Grid item xs={12}>
            <TextField
              autoComplete="summary"
              name="summary"
              variant="outlined"
              required
              fullWidth
              id="summary"
              label="Summary"
              onChange={(e) => onTextFeildChange(e)}
              value={tour.summary}
            />
          </Grid>
            </Grid>
            <Box m={3} textAlign="center" >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{width:"80%" }}
                onClick={(e) => onFormsubmit(e)}
              >
                Update
              </Button>
            </Box>
            
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleClick} >
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
// 
export default EditTour;