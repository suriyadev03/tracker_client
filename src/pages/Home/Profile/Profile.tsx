import { Box, TextField, Typography } from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import profileLogo from '../../../assets/user-profile.png'
import { useState } from "react";
import { Button, FormControl } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux/useAppRedux";
import axios from "axios";
import { startLoading } from "../../../store/reducers/baseReducer";
import { toast } from "react-toastify";


interface IFormInput {
    Name: string;
    EmpId: string;
    Email: string;
    Password: string;
    DateOfBirth: string | null;
    POSITION: any
}

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState(false)
    const { loggedUser } = useAppSelector((state => state.application))
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            Name: loggedUser.Name,
            EmpId: loggedUser.EmpId,
            Email: loggedUser.Email,
            Password: '',
            DateOfBirth: null
        }
    })
    const onSubmit: SubmitHandler<IFormInput> = data => {
        dispatch(startLoading(true))
        const userData = {
            Name: data.Name,
            EmpId: data.EmpId,
            Email: data.Email,
        };
        console.log("userData", userData);

        axios.post(import.meta.env.VITE_SERVER_URL + "/updateUser", userData)
            .then((res) => {
                toast.success(res.data.msg);
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
        localStorage.setItem("isloggedIn", "false");
        navigate("/auth/login")
    }
    return (
        <Box sx={{ minWidth: 300, maxWidth: 350, minHeight: "550px", maxHeight: "550px", display: "flex", flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ textAlign: '', height: '30px', p: 1, color: "black" }}>Your <b>Profile</b></Typography>
            <div className="self-end p-5" onClick={activeEditProfile}>{!edit ? <EditNoteIcon /> : <CloseIcon />}</div>
            <img src={profileLogo} className="w-32 self-center" />
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
            </form>
            <Button variant="outlined" color="warning" sx={{ margin: "20px", color: "orange", border: "2px solid orange" }} onClick={Logout}>Logout</Button>

        </Box>
    )
}

export default Profile