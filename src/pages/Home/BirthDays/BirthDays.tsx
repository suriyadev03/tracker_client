import { useAppSelector } from '../../../hooks/useRedux/useAppRedux'
import { Box, Card, CardContent, Typography } from '@mui/material';
import cakeImg from '../../../assets/cakeImg.png'
import { RootState } from '../../../store';
const BirthDays = () => {
  const { usersBirthDays } = useAppSelector((state: RootState) => state.application);


  return (
    <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px" }}>
      <Typography variant="h5" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}>Friends In Your <b>Team</b></Typography>
      {
        !!usersBirthDays.length ? <div className='scrollBar-regular-treat'>
          {
            usersBirthDays?.map((data) => (
              <Card sx={{ mt: 1 }}>

                <CardContent sx={{ minWidth: 350, maxWidth: 390, display: "flex" }} className='teamMembers'>
                  <img src={cakeImg} className='w-16' />
                  <div className='pl-2 flex flex-col text-sm'>
                    <Typography variant="h6" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}>{(data.DateOfBirth)?.slice(0, 10)}</Typography>
                    <span className='pl-2'>{data.Name}</span>
                    {/* <span></span> */}
                  </div>
                </CardContent>
              </Card>

            ))
          }
        </div> : <div className='scrollBar-regular-treat'>
          {
            Array.from({ length: 10 }, (_, i) => (
              <Card sx={{ mt: 1 }}>

                <CardContent sx={{ minWidth: 350, maxWidth: 390, display: "flex" }} className='teamMembers'>
                  <img src={cakeImg} className='w-16 blur-[3px]' />
                  <div className='pl-2 flex flex-col text-sm'>
                    <Typography variant="h6" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}><span className='text-gray-900 blur-[3px]'>06-01-2000</span></Typography>
                    <span className='pl-2 text-gray-900 blur-[3px]'>Suriya</span>
                    {/* <span></span> */}
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>
      }

    </Box>
  );
};

export default BirthDays;
