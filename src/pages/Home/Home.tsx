import { Box, Typography } from '@mui/material';
import profileLogo from '../../assets/user-profile.png'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/joy/Stack';
import { ReactElement, useEffect, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CakeIcon from '@mui/icons-material/Cake';
import WalletIcon from '@mui/icons-material/Wallet';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useAppSelector } from '../../hooks/useRedux/useAppRedux';
import moment from 'moment';
import { RootState } from '../../store';

interface HomeMenu {
  name: string;
  routeTo: string;
  logo: ReactElement;
}

const Home = () => {
  // const {usersBirthDays} = useAppSelector((state =>state.application))
  const { users } = useAppSelector((state: RootState) => state.application);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<string[]>([]);
  const [upcomingBirthDaydate, setUpcomingBirthDaydate] = useState<any>({})
  useEffect(() => {
    console.log("users", users);
    debugger
    const momentDates: moment.Moment[] = users.map(dateStr => moment(dateStr.DateOfBirth));

    const today: moment.Moment = moment();

    const getNextBirthday = (birthday: moment.Moment): moment.Moment => {
      const thisYearBirthday = birthday.clone().year(today.year());
      if (thisYearBirthday.isBefore(today)) {
        thisYearBirthday.add(1, 'year');
      }
      return thisYearBirthday;
    };

    const sortedBirthdays = momentDates.sort((a, b) => {
      const nextA = getNextBirthday(a);
      const nextB = getNextBirthday(b);
      return nextA.diff(today) - nextB.diff(today);
    });

    const sortedBirthdayStrings: string[] = sortedBirthdays.map(date => date.toISOString());

    setUpcomingBirthdays(sortedBirthdayStrings);
    const index = users.findIndex(obj => obj.DateOfBirth === sortedBirthdayStrings[0]);
    setUpcomingBirthDaydate(users[index])

  }, [users]);
  const HOME_MENUS: HomeMenu[] = [
    {
      name: "Team Members",
      routeTo: "teammembers",
      logo: <GroupsIcon sx={{ fontSize: "80px" }} />
    },
    {
      name: "Regular Treat",
      routeTo: "regulartreat",
      logo: <FastfoodIcon sx={{ fontSize: "80px" }} />
    },
    {
      name: "BirthDays",
      routeTo: "birthdays",
      logo: <CakeIcon sx={{ fontSize: "80px" }} />
    },
    {
      name: "Available Balance",
      routeTo: "availablebalance",
      logo: <WalletIcon sx={{ fontSize: "80px" }} />
    },
    {
      name: "Calender",
      routeTo: "calender",
      logo: <EventAvailableIcon sx={{ fontSize: "80px" }} />
    }
  ]
  console.log("upcomingBirthdays", upcomingBirthdays[0]);
  const getBirthMonth = () => {
    debugger
    console.log("upcomingBirthDaydate.toString()",upcomingBirthDaydate);
    // upcomingBirthDaydate.
    const monthNumber = 7;
    const date = new Date(0, monthNumber - 1);
    const monthName = date.toLocaleString('default', { month: 'long' }).slice(0,3);
    console.log("monthName", monthName);
    return monthName

  }
  const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Afternoon';
    } else if (currentHour >= 17 && currentHour < 20) {
      return 'Evening';
    } else {
      return 'Night';
    }
  };
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("isloggedIn") === "true") {
      navigate('/home')
    } else {
      navigate('/auth/login')
    }
  }, [])


  return (
    <Box sx={{ alignItems: "center", minWidth: 300, maxWidth: 350, pl: 2, pr: 2, display: 'flex', flexGrow: 1, flexDirection: 'column', alignContent: 'center' }}>
      <div className='w-[96%]'>
        <Typography variant="h5" sx={{ textAlign: '', p: 1, color: "black" }}>Good {getCurrentTimeOfDay()} <b>{}</b></Typography>
        <Stack spacing={1} sx={{ width: "100%", height: '20%' }}>
          <div className='upcomingBirthday flex items-center justify-between'>
            <div className='pl-3 pb-3'>
              <span className='text-xs'>Upcomming Birthday</span>
              <div className='flex'>
                <div className='flex items-center'><img src={profileLogo} className='w-12' /><span className='pl-2 w-36 flex-wrap'><b></b></span></div>

              </div>

            </div>
            <div className='flex flex-col mr-3'>
              <span className='pl-[0.80rem]'><b>{getBirthMonth()}</b></span>
              <span className='text-black text-2xl pl-[0.85rem]'><b>06</b></span>
            </div>
          </div>
        </Stack>
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            mt: 2,
            width: 150,
            height: 150,

          },
        }}
      >
        {
          HOME_MENUS.map((data, index) => (
            <div className='pulse-single-square' key={index}>
              <Paper elevation={2} sx={{ textAlign: 'center' }} key={index} onClick={() => navigate(`/${data.routeTo}`)}>

                <span className='menuLogo'>{data.logo}</span>
              </Paper>
            </div>
          ))
        }
      </Box>
    </Box>
  )
}

export default Home
// 

