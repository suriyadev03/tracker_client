import { Box, Typography } from "@mui/material"



const Calenders = () => {
  return (
    <Box sx={{ alignItems: "center", minWidth: 300, maxWidth: 350, pl: 2, pr: 2, display: 'flex', flexGrow: 1, flexDirection: 'column', alignContent: 'center'}}>
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 10 }}>Calenders</Typography>
    </Box>
  )
}

export default Calenders
