import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommonService from '../../../commom/CommonService';

const ViewTour = () => {

  const {_id} = useParams();
  console.log('in view tour',_id);

  const navigate = useNavigate();
  const [tourdata, setTourData] = useState([]);

  useEffect(() => {
    getStudentdata();
}, [_id]);



  const getStudentdata = async() => {
    try {
      CommonService.httpGet(`http://103.206.139.86:5000/api/v1/tours/${_id}`,true).then((response) => {
        //  console.log(response.data);  
        // console.log("results",response.data.results);  
            console.log(response.data.data.tour);
            // console.log(response.data.data.tour.name);
            setTourData(response.data.data.tour);
            // setToursCount(response.data.results);
            console.log("in api...");
      })
            
    } catch (error) {
        console.log("error",error);
    }
}
const handleClick = () => {
        navigate("/dashboard/tour");
        console.log("Back to tour");
}
  return (
    <div>
            View{_id} Tour data
            <Box textAlign={"center"} p={2} mb={2}   >
            <Typography variant='h4'>Tour Detail</Typography>
        </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow  pl={1}>
                        <TableCell align='center' >No</TableCell>
                        <TableCell align='center' >Tour Name</TableCell>
                        <TableCell align='center' >Difficulty</TableCell>
                        <TableCell align='center' >Price</TableCell>
                        <TableCell align='center' >Duration</TableCell>
                        <TableCell align='center' >MaxGroupSize</TableCell>
                        <TableCell align='center' >Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center' >{tourdata._id}</TableCell>
                        <TableCell align='center' >{tourdata.name}</TableCell>
                        <TableCell align='center' >{tourdata.difficulty}</TableCell>
                        <TableCell align='center' >{tourdata.price}</TableCell>
                        <TableCell align='center' >{tourdata.duration}</TableCell>
                        <TableCell align='center' >{tourdata.maxGroupSize}</TableCell>
                        <TableCell align='center' >{tourdata.summary}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
            <Box m={3} textAlign="center" >
               <Button variant='contained' color='primary' onClick={handleClick} >Back to Home</Button>
            </Box>
    </div>
  )
}

export default ViewTour
