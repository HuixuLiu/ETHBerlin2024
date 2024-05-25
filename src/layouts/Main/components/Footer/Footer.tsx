import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Form } from 'react-router-dom';
import { TextField } from '@mui/material';
import { on } from 'events';
import { useFormik } from 'formik';
import { NotificationType } from 'enum/notifcation-type-enum';
import address from 'redux/slices/address';
import ContractService from 'services/contract-service';
import { NotificationService } from 'services/notification-service';

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const [address, setAddress] = React.useState('');

  const onSubmit = async (address: string) => {
    try {
      //const response = await EthereumService.uploadData(address, values.publicKey, values.signature, age, isDoctor, isDriver);
      //Should to ZK Proof here
      const contract = await ContractService.initializeEthers();
      const response = await ContractService.checkIsValid(contract.contract, address);
      if (!response) {
        NotificationService('Something wrong with Smart Contract!', NotificationType.DANGER, address);
      } else {
        if(response === true){
          alert('Wallet is qualified!');
        } else {
          alert('Wallet is not qualified!');
        }
      }
    } catch (error: any) {
      const message = error.message || 'Something went wrong';
      NotificationService('Error!', NotificationType.DANGER, message);
    }
  };

  // const formik = useFormik({
  //   initialValues,
  //   // validationSchema: validationSchema,
  //   onSubmit,
  // });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="EthBerlin04"
            width={80}
          >
            <Box
              component={'img'}
              src={
                'Ethereum.png'
              }
              height={1}
              width={1}
            />
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
          {/* <Form onSubmit={formik.handleSubmit}> */}
          <Grid item xs={12}>
          <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Check if the wallet is qualified:
            </Typography>
            <TextField
                label="Address"
                variant="outlined"
                name={'address'}
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}     
              />
          </Grid>
            <Box marginTop={1}>
              <Button
                variant="outlined"
                color="primary"
                component="a"
                target="blank"
                onClick={() => onSubmit(address)}
                size="small"
              >
                Check Wallet
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; SecureID 2024, ETHBerlin04. All rights reserved
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;


