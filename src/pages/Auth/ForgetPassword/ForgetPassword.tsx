import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../../assets/appLogo.png'
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { startLoading } from '../../../store/reducers/baseReducer';
import { useAppDispatch } from '../../../hooks/useRedux/useAppRedux';
import { IFormInput } from '../../../types';


const ForgetPassword: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      Email: '',
      Password: ''
    }
  });
  const [otp, setOtp] = useState<any>("");
  const [verifyOtp, setVerifyOtp] = useState<any>("");
  const [otpValid, setOtpValid] = useState<any>(false);
  const [updatePass, setUpdatePass] = useState<any>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(startLoading(true))
    if (updatePass) {
      axios.post(import.meta.env.VITE_SERVER_URL+"/updatepassword", { Email: data.Email, Password: data.Password })
        .then((res) => {
          if (res.data.status === "ok") {
            navigate("/auth/login")
            return toast.success(res.data.msg)
          }
        })
        .catch((err) => {
          dispatch(startLoading(false))
          return toast.error(err.response.data.msg)
        }).finally(()=>{
          dispatch(startLoading(false))
      })
    }
    if (!otpValid) {
      if (otp.length) {
        dispatch(startLoading(false))
        return toast.error("OPT Expried Try Again")
      }
      axios.post(import.meta.env.VITE_SERVER_URL+"/forgetpassword", { Email: data.Email})
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success(res.data.msg)
            setOtpValid(true)
            setVerifyOtp(res.data.otp)
            dispatch(startLoading(false))
          }
        })
        .catch((err) => {
          dispatch(startLoading(false))
          toast.error(err.response.data.msg)
        })
      setTimeout(() => {
        toast.error("OPT Expried Try Again")
        setOtpValid(false)
        setOtp("")
      }, 300000);
    } else if(otpValid && !updatePass) {
      if ((otp == verifyOtp)) {
        toast.success("OTP verifyed Successfull")
        setUpdatePass(true)
      } else {
        toast.error("Please Enter Valid OTP")
      }
      dispatch(startLoading(false))
    }

  };
  const handleChange = (newValue: any) => {
    setOtp(newValue)
  }
  const tryAgain = () => {
    setOtp("")
    setOtpValid(false)
  }
  return (
    <div className='h-[100vh] flex'>
    <Box sx={{ minWidth: 300,maxWidth: 300, m: "auto", p: 2 }}>
    <div className='appLogo flex justify-center'>
                <img src={appLogo} className='w-28 pb-4'/>
            </div>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>Forget Your Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                size='small'
                label="Email"
                error={!!errors.Email}
                disabled={otpValid}
                helperText={errors.Email ? errors.Email.message : ''}
              />
            )}
          />
        </FormControl>
        {otpValid && !updatePass && <Typography variant="h6" sx={{ textAlign: 'right', mb: 1, fontSize: "12px", cursor: "pointer" }}><span onClick={tryAgain} className='text-animate mt-2 mb-2'>Try Again ?</span></Typography>}
        {otpValid && !updatePass && <MuiOtpInput value={otp} onChange={handleChange} sx={{ width: "300px" }} />}
        <br />{updatePass && <FormControl fullWidth margin="dense">
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
                size='small'
                label="Create Password"
                error={!!errors.Password}
                helperText={errors.Password ? errors.Password.message : ''}
              />
            )}
          />
        </FormControl>}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 20 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{updatePass ? "Update Password" : (otpValid ? "Submit OTP" : "Send OTP")}</Typography><div className='btn-animate'><Button type="submit" variant="contained" sx={{
                        color: "black", backgroundColor: 'orange',borderRadius:"20px",
                        '&:hover': {
                            backgroundColor: 'darkorange',
                        },
                    }}><ArrowForwardIcon/></Button></div>
        </div>

      </form>
      <Typography variant='h6' sx={{ marginTop:"30px",textAlign: 'center',fontSize:"12px" }}>Are you remember your Password ? <span className='text-animate' onClick={()=>navigate("/auth/login")}>Login</span></Typography>
    </Box>
    </div>
  );
};

export default ForgetPassword;
