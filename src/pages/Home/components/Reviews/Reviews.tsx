
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Reviews = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box
        component="img"
        height={1}
        width={1}
        src={'https://assets.maccarianagency.com/svg/logos/google-original.svg'}
        alt="..."
        maxWidth={{ xs: 80, sm: 100, md: 120 }}
        marginBottom={2}
        sx={{
          filter:
            theme.palette.mode === 'dark'
              ? 'brightness(0) invert(0.7)'
              : 'none',
        }}
      />
      <Typography variant={'h6'} component={'p'} align={'center'}>
        Solana
        <br />
        Solona helps you to get rich fast!
        <br />
        wanna get rich fast?
      </Typography>
      <Box marginTop={{ xs: 2, sm: 4 }}>
        <Typography variant={'h6'} sx={{ fontWeight: 700 }} align={'center'}>
          Portfolio
        </Typography>
        <Typography color="text.secondary" align={'center'}>
          Solana
        </Typography>
      </Box>
    </Box>
  );
};

export default Reviews;
