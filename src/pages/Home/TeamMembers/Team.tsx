import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/useRedux/useAppRedux'
import { Box, Card, CardContent, Typography } from '@mui/material';
import profileLogo from '../../../assets/person.png'
import { RootState } from '../../../store';
import { User } from '../../../types';


const Team: React.FC = () => {
  const { users } = useAppSelector((state: RootState) => state.application);
  const [userList, setUserList] = useState<User[]>([]);

  
  useEffect(() => {
    setUserList(users)
  }, [users])
  console.log("userList", userList.length);

  return (
    <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px" }}>
      <Typography variant="h5" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}>Friends In Your <b>Team</b></Typography>
      {
        !!userList.length ? <div className='scrollBar-regular-treat'>
        {
          userList?.map((data,i) => (
            <Card sx={{ mt: 1 }} key={i}>

              <CardContent sx={{ display: "flex" }} className='pb-1'>
                <img src={profileLogo} className='w-16 h-16 rounded-full' />
                <div className='pl-2 flex flex-col text-sm'>
                  <span>{data.Name}</span>
                  <span>{data.Email}</span>
                  <span>{(data.DateOfBirth).slice(0, 10)}</span>
                </div>
              </CardContent>
            </Card>

          ))
        }
      </div> : <div className='scrollBar-regular-treat'>
        {
          Array.from({ length: 10 }, (_,i) => (
            <Card sx={{ mt: 1 }} key={i}>

              <CardContent sx={{ minWidth: 350, maxWidth: 390, display: "flex" }} className='pb-1'>
                <img src={profileLogo} className='w-16 blur-[3px]' />
                <div className='pl-2 flex flex-col text-sm'>
                  <span className='text-gray-900 blur-[3px]'>Suriys</span>
                  <span className='text-gray-900 blur-[3px]'>suriya@gmail.com</span>
                  <span className='text-gray-900 blur-[3px]'>06-01-2000</span>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
      }
      
    </Box>
  )
}

export default Team
