import { Box, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareLogo from '../../../assets/shareLogo.png'
import { useNavigate } from "react-router-dom";


const Calenders = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ minWidth: 300, maxWidth: 300, minHeight: "550px",maxHeight: "550px", m: 'auto', p: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
      <div className='pulse-single' onClick={()=>navigate("/home")}><ArrowBackIcon/></div>
        <div className='shareLogo'>
          <img src={ShareLogo}/>
        </div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Treat Tracker</Typography>
      </div>
      <hr />
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 10 }}>Calenders</Typography>
    </Box>
  )
}

export default Calenders
