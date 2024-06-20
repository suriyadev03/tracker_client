import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button, Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux/useAppRedux';
import { useNavigate } from 'react-router-dom';
import ShareLogo from '../../../assets/shareLogo.png'
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OtpInput from "react-otp-input";
import { MuiOtpInput } from 'mui-one-time-password-input'


interface IFormInput {
  Email: string;
  Password: string;
  otp: number;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      Email: '',
      Password: ''
    }
  });
  const [otp, setOtp] = useState<any>("");
  const [verifyOtp, srtVerifyOtp] = useState<any>("");
  const [otpValid, setOtpValid] = useState<any>(false);
  const [updatePass, setUpdatePass] = useState<any>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (updatePass) {
      axios.post(import.meta.env.VITE_SERVER_URL+"/updatepassword", { Email: data.Email, Password: data.Password })
        .then((res) => {
          if (res.data.status === "ok") {
            navigate("/auth/login")
            return toast.success(res.data.msg)
          }
        })
        .catch((err) => {
          return toast.error(err.response.data.msg)
        })
    }
    if (!otpValid) {
      if (otp.length) {
        return toast.error("OPT Expried Try Again")
      }
      axios.post(import.meta.env.VITE_SERVER_URL+"/forgetpassword", { Email: data.Email, otp: Math.floor(1000 + Math.random() * 9000) })
        .then((res) => {
          if (res.data.status === "ok") {
            toast.success(res.data.msg)
            setOtpValid(true)
            srtVerifyOtp(res.data.otp)
          }
        })
        .catch((err) => {
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
    <Box sx={{ minWidth: 300,maxWidth: 300, m: "auto", p: 2 }}>
      <div className='shareLogo'>
        <img src={ShareLogo} />
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
        {otpValid && !updatePass && <Typography variant="h6" sx={{ textAlign: 'right', mb: 1, fontSize: "12px", cursor: "pointer" }}><span onClick={tryAgain}>Try Again ?</span></Typography>}
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
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{updatePass ? "Update Password" : (otpValid ? "Submit OTP" : "Send OTP")}</Typography><Button type="submit" variant="contained" sx={{
            color: "black", backgroundColor: 'orange', borderRadius: "20px", marginLeft: "5px",
            '&:hover': {
              backgroundColor: 'darkorange',
            },
          }}><ArrowForwardIcon /></Button>
        </div>

      </form>
      <Typography variant='h6' sx={{ marginTop:"30px",textAlign: 'center',fontSize:"12px" }}>Are you remember your Password ? <span style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>navigate("/auth/login")}>Login</span></Typography>
    </Box>
  );
};

export default ForgetPassword;
