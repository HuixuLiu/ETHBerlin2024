import React, { useState } from 'react';
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
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import  EthereumService  from '../../../../services/ethereum';
import ContractService from 'services/contract-service';
import ZKProofService from '../../../../services/zkproof';
import { useDispatch, useSelector } from 'react-redux';
import { selectWalletAddress, selectWalletStatus, getWalletAddress } from 'redux/slices/address';
import { AppDispatch } from 'redux/store';
import { ec as EC } from 'elliptic';
import { is } from 'immer/dist/internal';

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

  const [age, setAge] = React.useState(18);
  const [isDoctor, setIsDoctor] = React.useState('');
  const [isDriver, setIsDriver] = React.useState('');

  const [walletAddress, setWalletAddress] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector(selectWalletAddress);
  const status = useSelector(selectWalletStatus);

  const handleGetWalletAddress = () => {
    console.log('Connected address:', address);

    setWalletAddress(address);
    dispatch(getWalletAddress());

  };

  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as unknown as number);
  };

  const handleDoctorChange = (event: SelectChangeEvent) => {
    setIsDoctor(event.target.value as string);
  };

  const handleDriverChange = (event: SelectChangeEvent) => {
    setIsDriver(event.target.value as string);
  };

  const initialValues = {
    signature: '',
    publicKey: '',
  };

  const onSubmit = async (values: any, {setErrors, setStatus, setSubmitting}: any) => {
    try {
      handleGetWalletAddress();
      //Should to ZK Proof here
      

// console.log(`Proof valid for message ${message1}:`, isValid1);
      const message1 = age;
      const { secret: secret1, publicKey: publicKey1} = ZKProofService.generateKeys(age.toString());
      const G = new EC('secp256k1');
      const { R: R1, s: s1 } = ZKProofService.createProof(G, secret1);
      const isValid1 = ZKProofService.verifyProof(G, publicKey1, R1, s1);
      //const zkproof = await EthereumService.uploadData(address, values.publicKey, values.signature, age, isDoctor, isDriver);

      if(isValid1){
        NotificationService('Congrats! Upload Successfully', NotificationType.SUCCESS, 'ZK Proved Valid!');
        console.log(`Proof valid for message ${message1}:`, isValid1);
     
        const contract = await ContractService.initializeEthers();
        const response = await ContractService.addAddress(contract.contract, address);
        if (!response) {
          NotificationService('Failed to add address to valid list', NotificationType.DANGER, 'The address is not valid');
        } else {
          navigate('/home', 
            {state:{zkproof : isValid1, age: age, isDoctor: isDoctor, isDriver: isDriver, address: address}}
          );
          NotificationService('We labeled your address!', NotificationType.SUCCESS, 'You can now check your proof');
        }
      } else {
        NotificationService('ZK Proof Failed!', NotificationType.DANGER, 'The signature is not valid');
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
    // validationSchema: validationSchema,
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
          Select your identity
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Good Morning!
        </Typography>
        <Typography color="text.secondary">
          Upload to gain your digital identity proof.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter your identity signature:
            </Typography>
            <TextField
              label="Signature *"
              variant="outlined"
              name={'signature'}
              fullWidth
              value={formik.values.signature}
              onChange={formik.handleChange}
              error={formik.touched.signature && Boolean(formik.errors.signature)}
              // @ts-ignore
              helperText={formik.touched.signature && formik.errors.signature}
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
                  Please enter your public key:
                </Typography>
              </Box>
              <Typography variant={'subtitle2'}>
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/password-reset-cover'}
                  underline={'none'}
                >
                  Don't have a public key?
                </Link>
              </Typography>
            </Box>
            <TextField
              label="Public Key *"
              variant="outlined"
              name={'publicKey'}
              type={'password'}
              fullWidth
              value={formik.values.publicKey}
              onChange={formik.handleChange}
              error={formik.touched.publicKey && Boolean(formik.errors.publicKey)}
              // @ts-ignore
              helperText={formik.touched.publicKey && formik.errors.publicKey}
            />
          </Grid>
          </Grid>
          <Grid container spacing={4}>
          <Grid item  xs={12}>
            <Box marginBottom={{ xs: 1, sm: 0 }}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 4, marginTop : 4 }}>
                Please select your age, title and driver's liscence status:
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              
              <Grid item container xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age.toString()}
                      label="Age"
                      onChange={handleAgeChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item container xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isDoctor}
                      label="Title"
                      onChange={handleDoctorChange}
                    >
                      <MenuItem value={10}>Doctor</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item container xs={12}>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">License</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isDriver}
                      label="License"
                      onChange={handleDriverChange}
                    >
                      <MenuItem value={10}>have driver's license</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Box>
            
            <Grid item container xs={12} justifyContent={'center'}>
              <Box marginBottom={{ xs: 4, sm: 0 }} marginTop={4} width="100%">
                <Button size={'large'} variant={'contained'} type={'submit'} fullWidth>
                  Upload
                </Button>
              </Box>
            </Grid>
           
            
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
