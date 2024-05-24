import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import {useNavigate} from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import {NotificationService} from '../../../../services/notification-service';
import {NotificationType} from '../../../../enum/notifcation-type-enum';

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    // .email('Please enter a valid email address')
    .required('Username is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = (): JSX.Element => {
  const {signIn} = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values: any, {setErrors, setStatus, setSubmitting}: any) => {
    try {
      const state = await signIn(values.username, values.password);
      if (!state) {
        //
      } else {
        navigate('/home');
        NotificationService('Welcome!', NotificationType.SUCCESS, values.username);
        // Store.addNotification({
        //     title: 'Fail to login',
        //     message: 'Please check your password or username',
        //     // type: "success", warning, info, default
        //     type: 'danger',
        //     insert: 'top',
        //     container: 'top-right',
        //     animationIn: ['animate__animated', 'animate__fadeIn'],
        //     animationOut: ['animate__animated', 'animate__fadeOut'],
        //     dismiss: {
        //         duration: 5000,
        //         // onScreen: true
        //     }
        // });
      }
    } catch (error: any) {
      const message = error.message || 'Something went wrong';

      setStatus({success: false});
      setErrors({submit: message});
      setSubmitting(false);
    }
  };

  // const onSubmit = async (values: any, {setErrors, setStatus, setSubmitting}: any) => {
  //   return values;
  // };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Login
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome Back
        </Typography>
        <Typography color="text.secondary">
          Login to manage the website.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              请输入您的用户名：
            </Typography>
            <TextField
              label="Username *"
              variant="outlined"
              name={'username'}
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              // @ts-ignore
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              marginBottom={2}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  请输入您的密码：
                </Typography>
              </Box>
              <Typography variant={'subtitle2'}>
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/password-reset-cover'}
                  underline={'none'}
                >
                  Forgot your password?
                </Link>
              </Typography>
            </Box>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              // @ts-ignore
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Don't have an account yet?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signup-cover'}
                    underline={'none'}
                  >
                    Sign up here.
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
