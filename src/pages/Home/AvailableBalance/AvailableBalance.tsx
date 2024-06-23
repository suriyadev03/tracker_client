import { BottomNavigationAction, Box, Paper, Typography, BottomNavigation } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import appLogo from '../../../assets/appLogo.png'
import { useNavigate } from "react-router-dom";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState } from "react";
// import BottomNavigation from "../../../components/BottomTap/BottomNavigation";


const AvailableBalance = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ alignItems: "center", minWidth: 300, maxWidth: 350, pl: 2, pr: 2, display: 'flex', flexGrow: 1, flexDirection: 'column', alignContent: 'center'}}>
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 10 }}>AvailableBalance</Typography>

    </Box>
  )
}

export default AvailableBalance
