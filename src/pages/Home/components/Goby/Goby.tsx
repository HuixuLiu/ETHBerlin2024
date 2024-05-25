
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Goby = (): JSX.Element => {
  const theme = useTheme();
  const Proof: string = 'ZK12edfvsrtfebfgdvsdfdf';

  return (
    <Box>
      <Typography
        variant="h1"
        align={'center'}
        gutterBottom
        sx={{
          fontWeight: 900,
          color: theme.palette.common.white,
        }}
      >
        {Proof}
      </Typography>
      <Typography
        variant="h4"
        component="p"
        color="text.primary"
        align={'center'}
        sx={{
          color: theme.palette.common.white,
        }}
      >
        Feel free to check out the proof above!
      </Typography>
    </Box>
  );
};

export default Goby;
