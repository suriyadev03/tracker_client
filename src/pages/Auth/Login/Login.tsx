import React from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../../hooks/useRedux/useAppRedux';
import { Link, useNavigate } from 'react-router-dom';
import appLogo from '../../../assets/appLogo.png'
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoggedUserDetails, setAuthenticate, startLoading, userDetails  } from '../../../store/reducers/baseReducer';
import { IFormInputLogin } from '../../../types';

const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInputLogin>({
        defaultValues: {
            EmpId: '',
            Password: ''
        }
    });
    const onSubmit: SubmitHandler<IFormInputLogin> = (data) => {
        dispatch(startLoading(true))
        axios.post(import.meta.env.VITE_SERVER_URL+"/login", { EmpId: data.EmpId, Password: data.Password })
            .then((res) => {
                if (res.data.status === "ok") {
                    toast.success(res.data.msg)
                    dispatch(setAuthenticate(true))
                    dispatch(LoggedUserDetails(res.data.loggedUser))
                    dispatch(userDetails(res.data.users))
                    localStorage.setItem("isloggedIn","true")
                    navigate("/home")
                }
                if (res.data.status === "warning") {
                    toast.warning(res.data.msg);
                }
            })
            .catch((err) => {
                dispatch(startLoading(false))
                toast.warning(err.response.data.msg)
            }).finally(()=>{
                dispatch(startLoading(false))
            })
    };
    return (
        <div className='authWrapper'>
        <Box sx={{ minWidth: 300,maxWidth: 300, m: "auto", p: 2 }}>
            <div className='appLogo flex justify-center'>
                <img src={appLogo} className='w-28 pb-4'/>
            </div>

            <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>Access Your Account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="dense">
                    <Controller
                        name="EmpId"
                        control={control}
                        rules={{ required: 'Employee Id is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="EmpId"
                                size='small'
                                label="Employee Id"
                                error={!!errors.EmpId}
                                helperText={errors.EmpId ? errors.EmpId.message : ''}
                                style={{width:"300px"}}
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
                                size='small'
                                id="Password"
                                label="Password"
                                type="password"
                                error={!!errors.Password}
                                helperText={errors.Password ? errors.Password.message : ''}
                            />
                        )}
                    />
                </FormControl>
                <Typography variant="inherit" sx={{ textAlign: 'right', mb: 2,fontSize:"12px",color:"orange",cursor:"pointer",textDecoration:"underLine" }}><Link to="/auth/forgetpassword"><span className='text-animate'>Forget Password ?</span></Link></Typography>
        
                <div style={{ display: "flex", justifyContent: "flex-end",alignItems:"center",marginTop:20 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>SignIn</Typography><div className='btn-animate'><Button type="submit" variant="contained" sx={{
                        color: "black", backgroundColor: 'orange',borderRadius:"20px",
                        '&:hover': {
                            backgroundColor: 'darkorange',
                        },
                    }}><ArrowForwardIcon/></Button></div>
                </div>

            </form>
            <Typography variant='h6' sx={{ marginTop:"30px",textAlign: 'center',fontSize:"12px" }}>Don't have a accound ? <span className='text-animate' onClick={()=>navigate("/auth/register")}>Create</span></Typography>
        </Box>
        </div>
    );
};

export default Login;
