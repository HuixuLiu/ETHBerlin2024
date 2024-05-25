
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useLocation} from 'react-router-dom';

const Goby = (): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const Proof: string = 'ZK1rew543qwdear34rqdewds';

  // const Proof: string = location.state.zkproof;

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
