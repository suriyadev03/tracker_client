import React from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../../hooks/useRedux/useAppRedux';
import { Link, useNavigate } from 'react-router-dom';
import ShareLogo from '../../../assets/shareLogo.png'
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { setAuthenticate  } from '../../../store/reducers/baseReducer';

interface IFormInput {
    EmpId: string;
    Password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            EmpId: '',
            Password: ''
        }
    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        axios.post(import.meta.env.VITE_SERVER_URL+"/login", { EmpId: data.EmpId, Password: data.Password })
            .then((res) => {
                if (res.data.status === "ok") {
                    toast.success(res.data.msg)
                    dispatch(setAuthenticate())
                    navigate("/home")
                }
                if (res.data.status === "warning") {
                    toast.warning(res.data.msg);
                }
            })
            .catch((err) => {
                toast.warning(err.response.data.msg)
            })
    };
    return (
        <Box sx={{ minWidth: 300,maxWidth: 300, m: "auto", p: 2 }}>
            <div className='shareLogo'>
                <img src={ShareLogo} />
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
                <Typography variant="inherit" sx={{ textAlign: 'right', mb: 2,fontSize:"12px",color:"orange",cursor:"pointer",textDecoration:"underLine" }}><Link to="/auth/forgetpassword">Forget Password ?</Link></Typography>
        
                <div style={{ display: "flex", justifyContent: "flex-end",alignItems:"center",marginTop:20 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>SignIn</Typography><Button type="submit" variant="contained" sx={{
                        color: "black", backgroundColor: 'orange',borderRadius:"20px",marginLeft:"5px",
                        '&:hover': {
                            backgroundColor: 'darkorange',
                        },
                    }}><ArrowForwardIcon/></Button>
                </div>

            </form>
            <Typography variant='h6' sx={{ marginTop:"30px",textAlign: 'center',fontSize:"12px" }}>Don't have a accound ? <span style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>navigate("/auth/register")}>Create</span></Typography>
        </Box>
    );
};

export default Login;
