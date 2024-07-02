import { Box, Skeleton, Typography } from '@mui/material';
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
import personImg from '../../assets/person.png'
import ExpenceTracker from '../../assets/tripExpence.png'
import { getBirthMonth } from '../../utils/localHelpers';


const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { users } = useAppSelector((state: RootState) => state.application);
  const [birthDayOrder, setBirthDayOrder] = useState<User[]>([])
  const [loggedName, setLoggedName] = useState('')


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
    const updateData = async () => {
      const sortedBirthdays = [...users].sort(compareUpcomingBirthdays);
      dispatch(BirthDayDetails(sortedBirthdays));
      setBirthDayOrder(sortedBirthdays);

      const loggedId = sessionStorage.getItem("islogged");
      if (loggedId) {
        const findLoggedUser = users.findIndex((item) => item._id === loggedId);
        if (findLoggedUser !== -1) {
          console.log("users[findLoggedUser].Name", users[findLoggedUser].Name);
          setLoggedName(users[findLoggedUser].Name);

        } else {
          console.log("User not found");
        }
      }
    };

    updateData();
  }, [users, dispatch]);

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
      name: "Wallet",
      routeTo: "availablebalance",
      logo: <WalletIcon sx={{ fontSize: "80px" }} />
    },
    {
      name: "Expence Tracker",
      routeTo: "expenceTracker",
      logo: <img src={ExpenceTracker} style={{width:'100px'}}/>
    },
    {
      name: "Calender",
      routeTo: "calender",
      logo: <EventAvailableIcon sx={{ fontSize: "80px" }} />
    }
  ]

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

  useEffect(() => {
    if (sessionStorage.getItem("isloggedIn") !== "true") {
      navigate('/auth/login')
    } else {
      navigate('/home')
    }
  }, [])


  return (
    <Box sx={{ height:'93vh', alignItems: "center", minWidth: 300, maxWidth: 400, pl: 2, pr: 2, display: 'flex', flexGrow: 1, flexDirection: 'column', alignContent: 'center' }}>
      <div className='w-[96%] h-[22%]'>
        <Typography variant="h5" sx={{ textAlign: '', p: 1, color: "black" }}>Good {getCurrentTimeOfDay()} <b>{loggedName.split(' ')[0]}</b></Typography>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <div className='upcomingBirthday h-24 w-full rounded-2xl text-black shadow-lg flex items-center justify-between'>
            <div className='pl-3 pb-3'>
              <span className='text-xs'>Upcomming Birthday</span>
              <div className='flex'>
                <div className='flex items-center'>
                  <img src={personImg} className='w-12 h-12 rounded-full' />
                  <span className='pl-2 w-36 flex-wrap'><b>{!!birthDayOrder.length ? birthDayOrder[0].Name : <Skeleton />}</b></span></div>
              </div>
            </div>
            <div className='flex flex-col mr-3 items-center'>
              <span className=''><b>{!!birthDayOrder.length ? getBirthMonth(String(birthDayOrder[0].DateOfBirth)) : <span className='text-gray-900 blur-[3px]'>02</span>}</b></span>
              <span className='text-black text-xl'><b>{!!birthDayOrder.length ? birthDayOrder[0].DateOfBirth?.slice(8, 10) : <span className='text-gray-900 blur-[3px]'>Jan</span>}</b></span>
            </div>
          </div>
        </Stack>
      </div>
      <div className='h-[calc(78%-68px)] overflow-y-scroll hideScrollbar'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            mt: 2,
            width: '44%',
            aspectRatio:1/1,
          },
        }}
      >
        {
          HOME_MENUS.map((data, index) => (
            <div className='pulse-single-square rounded-2xl' key={index}>
              <>
                <Paper elevation={2} sx={{ textAlign: 'center' }} className='mt-0 h-full w-full rounded-2xl flex flex-col items-center justify-center' key={index} onClick={() => navigate(`/${data.routeTo}`)}>

                  <span className='menuLogo'>{data.logo}</span>
                  <span className='text-xs text-gray-400'>{data.name}</span>
                </Paper>
              </>
            </div>
          ))
        }
      </Box>
      </div>
    </Box>
  )
}

export default Home


