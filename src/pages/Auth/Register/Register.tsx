import React from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import appLogo from '../../../assets/appLogo.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { startLoading } from '../../../store/reducers/baseReducer';
import { useAppDispatch } from '../../../hooks/useRedux/useAppRedux';
import moment from 'moment';
import { IFormInputRegister } from '../../../types';


const Register: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInputRegister>({
        defaultValues: {
            Name: '',
            EmpId: '',
            Email: '',
            Password: '',
            DateOfBirth: null
        }
    })
    const onSubmit: SubmitHandler<IFormInputRegister> = data => {
        const dateMoment = moment(data.DateOfBirth);
        const dateOnly = dateMoment.format('YYYY-MM-DD');
        const userData = {
            Name: data.Name,
            EmpId: data.EmpId,
            Email: data.Email,
            Password: data.Password,
            DateOfBirth: dateOnly
        };
        
        dispatch(startLoading(true))
        axios.post(import.meta.env.VITE_SERVER_URL+"/register", userData)
            .then((res) => {
                navigate("/auth/login");
                toast.success(res.data.msg);
            })
            .catch((err) => {
                dispatch(startLoading(false))
                toast.error(err);
            }).finally(()=>{
                dispatch(startLoading(false))
            })
    };
    return (
        <div className='h-[100vh] flex'>
        <Box sx={{ minWidth: 300,maxWidth: 300, m: 'auto',p:2 }}>
        <div className='appLogo flex justify-center'>
                <img src={appLogo} className='w-28 pb-4'/>
            </div>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Open Your Account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="dense">
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
                                error={!!errors.Name}
                                helperText={errors.Name ? errors.Name.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth margin="dense">
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
                                error={!!errors.EmpId}
                                helperText={errors.EmpId ? errors.EmpId.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth margin="dense">
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
                                error={!!errors.Email}
                                helperText={errors.Email ? errors.Email.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <Controller
                        name="Password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="Password"
                                size="small"
                                label="Password"
                                type="password"
                                error={!!errors.Password}
                                helperText={errors.Password ? errors.Password.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Controller
                            name="DateOfBirth"
                            control={control}
                            rules={{
                                required: 'DateOfBirth is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Invalid phone number'
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    disableFuture
                                    label="Date of Birth"
                                    format='DD/MM/YYYY'
                                />
                            )}
                        />
                    </LocalizationProvider>
                </FormControl>
                <div style={{ display: "flex", justifyContent: "flex-end",alignItems:"center",marginTop:20 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Create</Typography><div className='btn-animate'><Button type="submit" variant="contained" sx={{
                        color: "black", backgroundColor: 'orange',borderRadius:"20px",
                        '&:hover': {
                            backgroundColor: 'darkorange',
                        },
                    }}><ArrowForwardIcon/></Button></div>
                </div>
            </form> 
            <Typography variant='h6' sx={{ marginTop:"30px",textAlign: 'center',fontSize:"12px" }}>Already have a accound ? <span className='text-animate' onClick={()=>navigate("/auth/login")}>SignIn</span></Typography>
        </Box>
        </div>
    );
};

export default Register;
