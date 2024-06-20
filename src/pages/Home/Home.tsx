import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/useRedux/useAppRedux"
import { useNavigate } from "react-router-dom"
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import ShareLogo from '../../assets/shareLogo.png'
import teamLogo from '../../assets/teamLogo.png'
import dailyTreatLogo from '../../assets/dailyTreatLogo.png'
import birthdayLogo from '../../assets/birthdayLogo.webp'
import availableBalance from '../../assets/availableBalance.png'
import calender from '../../assets/calender.webp'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';

interface HomeMenu {
  name: string;
  routeTo: string;
  logo: string;
}

const App = () => {
  const HOME_MENUS: HomeMenu[] = [
    {
      name: "Team Members",
      routeTo: "teammembers",
      logo: teamLogo
    },
    {
      name: "Daily Treat",
      routeTo: "dailytreat",
      logo: dailyTreatLogo
    },
    {
      name: "BirthDays",
      routeTo: "birthdays",
      logo: birthdayLogo
    },
    {
      name: "Available Balance",
      routeTo: "availablebalance",
      logo: availableBalance
    },
    {
      name: "Calender",
      routeTo: "calender",
      logo: calender
    }
  ]
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(!isAuthenticated){
  //     navigate('/auth/login')
  //   }else{
  //     navigate('/home')
  //   }
  // },[])

  return (

    <Box sx={{ minWidth: 300, maxWidth: 300, minHeight: "450px", m: 'auto', p: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <ArrowBackIcon />
        <div className='shareLogo'>
          <img src={ShareLogo} style={{ width: "80px" }} />
        </div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Treat Tracker</Typography>
      </div>
      <hr />
      <Box
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        {
          HOME_MENUS.map((data, index) => (
            <Paper elevation={2} sx={{ textAlign: 'center' }} key={index}>
              <img src={data.logo} style={{ height: "100%", width: "100%" }} onClick={() => navigate(`/${data.routeTo}`)}/>
            </Paper>
          ))
        }
      </Box>
    </Box>
  )
}

export default App