import { Box, TextField, Typography } from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {  useEffect, useState } from "react";
import { Button, FormControl } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useRedux/useAppRedux";
import axios from "axios";
import { LoggedUserDetails, startLoading, userDetails } from "../../../store/reducers/baseReducer";
import { toast } from "react-toastify";
import { IFormInputRegister } from "../../../types";
import personImg from '../../../assets/person.png'


const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState(false)
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputRegister>({
        defaultValues: {
            Name: '',
            EmpId: '',
            Email: '',
            Password: '',
            DateOfBirth: null,
            ProfileImg: ""
        }
    })

    const onSubmit: SubmitHandler<IFormInputRegister> = data => {
        dispatch(startLoading(true))
        const userData = {
            Name: data.Name,
            EmpId: data.EmpId,
            Email: data.Email,
            ProfileImg: ""

        };

        axios.post(import.meta.env.VITE_SERVER_URL + "/updateUser", userData)
            .then((res) => {
                toast.success(res.data.msg);
                dispatch(LoggedUserDetails(res.data.loggedUser))
                setEdit(!edit)
            })
            .catch((err) => {
                dispatch(startLoading(false))
                toast.error(err);
            }).finally(() => {
                dispatch(startLoading(false))
            })
    }
    const activeEditProfile = () => {
        setEdit(!edit)
    }
    const Logout = () => {
        sessionStorage.removeItem("islogged");
        sessionStorage.removeItem("isloggedIn");
        navigate("/auth/login")
        toast.success("You have been logged out")
    } 

    useEffect(()  =>  {
        const fetchData = () => {
            if (sessionStorage.getItem("isloggedIn") === "true") {
                axios.post(import.meta.env.VITE_SERVER_URL + "/getUser", {})
                    .then(async (res) => {
                        if (res.data.status === "ok") {
    
                            dispatch(userDetails(res.data.users))
                            const loggedId = sessionStorage.getItem("islogged")
                            const findLoggedUser = res.data.users.findIndex((item: { _id: any }) => item._id === loggedId);
                            dispatch(LoggedUserDetails(res.data.users[findLoggedUser]))
                            setValue("Name", res.data.users[findLoggedUser].Name)
                            setValue("EmpId", res.data.users[findLoggedUser].EmpId)
                            setValue("Email", res.data.users[findLoggedUser].Email)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
    
                    })
            }
        }
        fetchData()
    }, [])
    return (
        <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px", display: "flex", flexDirection: 'column', justifyContent: "center" }}>
            <Typography variant="h5" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}>Your <b>Profile</b></Typography>
            <div className="w-[150px] h-[150px] rounded-full self-center mt-3 relative border-4 border-solid border-orange-300 ">
                <img src={personImg} className="w-full h-full rounded-full relative" />
                {edit && <div className="absolute w-[150px] h-[150px] rounded-full bg-[#e2e8f09e] top-0 flex justify-center items-center cursor-pointer"><AddAPhotoIcon /></div>}
                {edit && <input type="file" className="absolute top-0 left-0 h-full w-full rounded-full opacity-0 cursor-pointer" />}

            </div>
            <div className="mt-[-15px] ml-[60%]" onClick={activeEditProfile}>{!edit ? <EditNoteIcon /> : <CloseIcon />}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="self-center mt-3 flex flex-col items-center">
                <FormControl style={{ marginTop: "10px" }}>
                    <Controller
                        name="Name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="Name"
                                label="Name"
                                disabled={!edit}
                                error={!!errors.Name}
                                helperText={errors.Name ? errors.Name.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl style={{ marginTop: "10px" }}>
                    <Controller
                        name="EmpId"
                        control={control}
                        rules={{ required: 'Employee Id is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="EmpId"
                                label="EmpId"
                                disabled={true}
                                error={!!errors.EmpId}
                                helperText={errors.EmpId ? errors.EmpId.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl style={{ marginTop: "10px" }}>
                    <Controller
                        name="Email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="Email"
                                size="small"
                                label="Email"
                                disabled={!edit}
                                error={!!errors.Email}
                                helperText={errors.Email ? errors.Email.message : ''}
                            />
                        )}
                    />
                </FormControl>

                <Button variant="outlined" disabled={!edit} type="submit" color="warning" sx={{ width: 150, margin: "20px", color: "orange", border: "2px solid orange" }}>Update</Button>
                <Button variant="outlined" color="warning" sx={{ width: "150px", margin: "20px", color: "orange", border: "2px solid orange" }} onClick={Logout}>Logout</Button>
            </form>

        </Box>
    )
}

export default Profile