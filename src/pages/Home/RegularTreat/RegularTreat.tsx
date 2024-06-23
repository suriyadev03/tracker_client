import React, { useEffect, useState } from 'react'
import { Button, Box, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import appLogo from '../../../assets/appLogo.png'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Paper from '@mui/material/Paper';



const getMondaysAndFridays = (startDate: string, endDate: string): Date[] => {
  const start = new Date(startDate);
  // const [treatMembers,setTreatMembers] = useState()
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
  "Mohan",
  "Nivedhitha",
  "Suriya",
  "SethuPathi",
  "Asik",
  "Rajesh",
  "Surendar",
  "Balaji",
  "Usman",
]

const RegularTreat: React.FC = () => {
  const navigate = useNavigate()
  const [dates, setDates] = useState<Date[]>([]);
  const [treatMembers, setTreatMembers] = useState(Members)

  useEffect(() => {
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().clone().add(30, 'days').format('YYYY-MM-DD');
    const mondaysAndFridays = getMondaysAndFridays(startDate, endDate);
    setDates(mondaysAndFridays);
  }, []);

  const postPonedTreat = () => {
    const startDate = moment(dates[1]).format('YYYY-MM-DD');
    const endDate = moment(dates[1],'YYYY-MM-DD').clone().add(30, 'days').format('YYYY-MM-DD');
    const mondaysAndFridays = getMondaysAndFridays(startDate, endDate);
    setDates(mondaysAndFridays);
  };
  return (
    <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px" }}>
      <Typography variant="h5" sx={{ textAlign: '',height:'30px', p: 1, color: "black" }}>Regular <b>Treat</b></Typography>

      <div className='scrollBar-regular-treat'>
        {
          dates?.map((data, index) => (
            <Card sx={{ mt: 1, mr: 1}}>

              <CardContent sx={{ pt: 1, pl: 1.5, pr: 1, pb: 0,minWidth:350 ,maxWidth:390}}>
                <Typography gutterBottom color="text.secondary" fontSize={13} variant="h6" component="div">
                  {data.toDateString()}
                </Typography>
                <Typography variant="h6">
                  <b>{treatMembers[index]}</b>
                </Typography>
              </CardContent>
              <CardActions sx={{ pt: 0, pl: 1, pr: 1, pb: 1, display: "flex", justifyContent: "space-between" }}>
                <Chip label="Postponed" variant="outlined" disabled={index != 0} onClick={() => postPonedTreat()} sx={{ color: '#ff8d00' }} />
                <Chip label="Completed" variant="outlined" disabled sx={{ color: '#ff8d00' }} />
              </CardActions>
            </Card>

          ))
        }
      </div>
    </Box>
  )
}

export default RegularTreat

