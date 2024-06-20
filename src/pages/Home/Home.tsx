import { Box, Typography } from '@mui/material';
import ShareLogo from '../../assets/shareLogo.png'
import teamLogo from '../../assets/teamLogo.png'
import dailyTreatLogo from '../../assets/dailyTreatLogo.png'
import birthdayLogo from '../../assets/birthdayLogo.webp'
import availableBalance from '../../assets/availableBalance.png'
import profileLogo from '../../assets/user-profile.png'
import calender from '../../assets/calender.png'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

interface HomeMenu {
  name: string;
  routeTo: string;
  logo: string;
}

const Home = () => {
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

    <Box sx={{ minWidth: 300, maxWidth: 300, minHeight: "550px", maxHeight: "550px", m: 'auto', p: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        
        <div className='shareLogo'>
          <img src={ShareLogo} style={{ width: "60px" }} />
        </div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Treat Tracker</Typography>
        <div className='pulse-single' style={{height:"30px"}}><img src={profileLogo} style={{ width: "30px" }} /></div>
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
            <div className='pulse-single-square'   >
            <Paper elevation={2} sx={{ textAlign: 'center' }} key={index} onClick={() => navigate(`/${data.routeTo}`)}>

              <img src={data.logo}/>
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