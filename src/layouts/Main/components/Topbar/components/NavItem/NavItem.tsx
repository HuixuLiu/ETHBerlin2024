import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  title: string;
  id: string;
  redirect: string;
  // items: Array<PageItem>;
  colorInvert?: boolean;
}

const NavItem = ({
  title,
  id,
  redirect,
  // items,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();

  //  const hasActiveLink = () => items.find((i) => i.href === activeLink);
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        aria-describedby={id}
        sx={{ cursor: 'pointer' }}
        // onClick={(e) => handleClick(e, id)}
      >
        <Typography
          fontWeight={ 1000 }
          color={linkColor}
          fontSize={20}
        >
          <Link href={redirect} underline='none'>
            {title}
          </Link>
        </Typography>
  
      </Box>
      
    </Box>
  );
};

export default NavItem;
