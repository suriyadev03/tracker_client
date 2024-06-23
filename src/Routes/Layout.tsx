import Header from '../components/HeaderPage/Header'
import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/Fooder/Fooder'
import { Stack } from '@mui/material'

const Layout = () => {
    return (
        <Stack height={'100vh'} display={"flex"} width={"100%"} alignItems={"center"}>
            <Header />
            <Outlet />
            <BottomNavigation />
        </Stack>
    )
}

export default Layout
