import React, { useEffect, useState } from 'react'
import { useAppSelector} from '../../../hooks/useRedux/useAppRedux'
import { Box, Card, CardContent, Typography } from '@mui/material';
import profileLogo from '../../../assets/user-profile.png'
import { RootState } from '../../../store';
import { User } from '../../../types';


const Team: React.FC = () => {
  const { users } = useAppSelector((state: RootState) => state.application);

  const [userList, setUserList] = useState<User[]>([]);
  
  useEffect(()=>{
    setUserList(users)
  },[])
  
  return (
    <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px" }}>
      <Typography variant="h5" sx={{ textAlign: '',height:'30px', p: 1, color: "black" }}>Friends In Your <b>Team</b></Typography>

      <div className='scrollBar-regular-treat'>
        {
          userList?.map((data) => (
            <Card sx={{ mt: 1}}>

              <CardContent sx={{minWidth:350 ,maxWidth:390,display:"flex"}} className='teamMembers'>
                <img src={profileLogo} className='w-16' />
                <div className='pl-2 flex flex-col text-sm'>
                  <span>{data.Name}</span>
                  <span>{data.Email}</span>
                  <span>{(data.DateOfBirth).slice(0,10)}</span>
                </div>
              </CardContent>
            </Card>

          ))
        }
      </div>
    </Box>
  )
}

export default Team
