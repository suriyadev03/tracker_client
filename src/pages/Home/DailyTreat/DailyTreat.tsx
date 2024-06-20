import React, { useEffect, useState } from 'react'
import {Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ShareLogo from '../../../assets/shareLogo.png'
import { useNavigate } from 'react-router-dom';


const getMondaysAndFridays = (startDate: string, endDate: string): Date[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let date = new Date(start);
  const days: Date[] = [];

  while (date <= end) {
    const day = date.getDay();
    if (day === 1 || day === 5) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
};
const Members = [
  "Usman",
  "Mohan",
  "Nivedhitha",
  "Suriya",
  "SethuPathi",
  "Asik",
  "Rajesh",
  "Surendar",
  "Balaji"
]
const DailyTreat: React.FC = () => {
  const navigate = useNavigate()
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    const startDate = '2024-06-20';
    const endDate = '2025-12-31';
    const mondaysAndFridays = getMondaysAndFridays(startDate, endDate);
    setDates(mondaysAndFridays);
  }, []);
   
  const getNextMember = (index: number) => {
    return Members[index % Members.length];
  };
  return (
    <Box sx={{ minWidth: 300, maxWidth: 300, minHeight: "450px", m: 'auto', p: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <div onClick={() => navigate("/home")}><ArrowBackIcon /></div>
        <div className='shareLogo'>
          <img src={ShareLogo} style={{ width: "80px" }} />
        </div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Treat Tracker</Typography>
      </div>
      <hr />
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Daily Treat</Typography>
      <AccordionGroup sx={{ maxWidth: 400, maxHeight: "400px", overflow: "scroll", overflowX: "hidden" }}>
        {
          dates?.map((data, index) => (
            <Accordion key={index}>
              <AccordionSummary><div style={{ display: "flex", alignItems: "center" }}>{data.toDateString()}</div></AccordionSummary>
              <AccordionDetails>
                <div><b>Name :</b>{getNextMember(index)}</div>
                <div className='buttonContainer'>
                <Button disabled type="submit" variant="contained">Reject</Button>
                <Button disabled type="submit" variant="contained">Postponed</Button>
                <Button disabled type="submit" variant="contained">Completed</Button></div>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </AccordionGroup>
    </Box>
  )
}

export default DailyTreat

