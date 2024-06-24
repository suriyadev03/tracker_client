import { Box, Typography } from '@mui/material';
import profileLogo from '../../assets/user-profile.png'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/joy/Stack';
import { useEffect, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CakeIcon from '@mui/icons-material/Cake';
import WalletIcon from '@mui/icons-material/Wallet';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux/useAppRedux';
import moment from 'moment';
import { RootState } from '../../store';
import { HomeMenu, User } from '../../types';
import { BirthDayDetails } from '../../store/reducers/baseReducer';


const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state: RootState) => state.application);
  const { loggedUser } = useAppSelector((state: RootState) => state.application);
  const [birthDayOrder, setBirthDayOrder] = useState<User[]>([])


  const calculateNextBirthday = (dob: Date): Date => {
    const currentYear = moment().year();
    const birthMonth = dob.getMonth();
    const birthDay = dob.getDate();

    const nextBirthday = moment([currentYear, birthMonth, birthDay]);
    if (nextBirthday.isBefore(moment())) {
      nextBirthday.add(1, "year");
    }
    return nextBirthday.toDate();
  };

  const compareUpcomingBirthdays = (a: User, b: User): number => {
    const nextBirthdayA = calculateNextBirthday(new Date(a.DateOfBirth));
    const nextBirthdayB = calculateNextBirthday(new Date(b.DateOfBirth));
    return moment(nextBirthdayA).diff(moment(nextBirthdayB));
  };

  useEffect(() => {
    const sortedBirthdays = [...users].sort(compareUpcomingBirthdays);
    dispatch(BirthDayDetails(sortedBirthdays))
    setBirthDayOrder(sortedBirthdays);
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
  const getBirthMonth = () => {
    const month = Number(birthDayOrder[0].DateOfBirth.slice(5, 7))

    const monthNumber = month.toString();
    const date = new Date(0, Number(monthNumber) - 1);
    const monthName = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
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
  const getName = () => {
    const fullName = loggedUser.Name ?? '';
    return fullName.split(' ')[0];
  }
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
        <Typography variant="h5" sx={{ textAlign: '', p: 1, color: "black" }}>Good {getCurrentTimeOfDay()} <b>{getName()}</b></Typography>
        {!!birthDayOrder.length && <Stack spacing={1} sx={{ width: "100%"}}>
          <div className='upcomingBirthday flex items-center justify-between'>
            <div className='pl-3 pb-3'>
              <span className='text-xs'>Upcomming Birthday</span>
              <div className='flex'>
                <div className='flex items-center'><img src={profileLogo} className='w-12' /><span className='pl-2 w-36 flex-wrap'><b>{birthDayOrder[0].Name}</b></span></div>

              </div>

            </div>
            <div className='flex flex-col mr-3 items-center'>
              <span className=''><b>{getBirthMonth()}</b></span>
              <span className='text-black text-2xl'><b>{birthDayOrder[0].DateOfBirth?.slice(8, 10)}</b></span>
            </div>
          </div>
        </Stack>}
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


