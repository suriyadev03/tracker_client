import Header from '../components/HeaderPage/Header'
import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/Fooder/Fooder'
import { Stack } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import { LoggedUserDetails, userDetails } from '../store/reducers/baseReducer'
import { useAppDispatch } from '../hooks/useRedux/useAppRedux'




const Layout = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem("isloggedIn") === "true") {
            axios.post(import.meta.env.VITE_SERVER_URL + "/getUser", {})
                .then((res) => {
                    if (res.data.status === "ok") {

                        dispatch(userDetails(res.data.users))
                        const loggedId = localStorage.getItem("islogged")
                        const findLoggedUser = res.data.users.findIndex((item: { _id: any }) => item._id === loggedId);
                        dispatch(LoggedUserDetails(res.data.users[findLoggedUser]))
                    }
                })
                .catch((err) => {
                    console.log(err);

                })
        }

    }, [])
    return (
        <Stack height={'100vh'} display={"flex"} width={"100%"} alignItems={"center"}>
            <Header />
            <Outlet />
            <BottomNavigation />
        </Stack>
    )
}

export default Layout
