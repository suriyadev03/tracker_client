import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux/useAppRedux'
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sheet from '@mui/joy/Sheet';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ShareLogo from '../../../assets/shareLogo.png'
import person from '../../../assets/person.png'
import axios from 'axios';
import { userDetails } from '../../../store/reducers/baseReducer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface User {
  id: number;
  Name: string;
  Email: string;
  DateOfBirth: string;
  // Add more fields as needed based on actual API response
} 

const Team: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userList, setUserList] = useState<User[]>([]);
  
  useEffect(() => {
    axios.post<{ status: string; users: User[] }>(import.meta.env.VITE_SERVER_URL+"/getUser", {})
      .then((res) => {
        if (res.data.status === "ok") {
          dispatch(userDetails(res.data.users))
          setUserList(res.data.users)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log("userList",userList);
  
  return (
    <Box sx={{ minWidth: 300, maxWidth: 300, minHeight: "450px", m: 'auto', p: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <div onClick={()=>navigate("/home")}><ArrowBackIcon/></div>
        <div className='shareLogo'>
          <img src={ShareLogo} style={{ width: "80px" }} />
        </div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Treat Tracker</Typography>
      </div>
      <hr />
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Team Members</Typography>
      <AccordionGroup sx={{ maxWidth: 400 }}>
        {
          userList?.map((data) => (
            <Accordion key={data.id}>
              <AccordionSummary><div style={{display:"flex",alignItems:"center"}}><img src={person} style={{width:"35px",marginRight:"10px"}}/>{data.Name}</div></AccordionSummary>
              <AccordionDetails>
                <div><b>Email :</b>{data.Email}</div>
                <div><b>DOB :</b>{(data.DateOfBirth).slice(0,10)}</div>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </AccordionGroup>
    </Box>
  )
}

export default Team
