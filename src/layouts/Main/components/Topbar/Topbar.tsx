import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { NotificationType } from '../../../../enum/notifcation-type-enum';
import { NotificationService } from '../../../../services/notification-service';

import { NavItem } from './components';
import { Typography } from '@mui/material';
import { color } from '@mui/system';

// Import Ethers.js
import { Eip1193Provider, ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAddress, updateWalletAddress, selectWalletAddress, selectWalletStatus } from './../../../../redux/slices/address';
import { AppDispatch } from 'redux/store';

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}


interface Props {
  onSidebarOpen: () => void;

  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
  // pages,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  // const wallet = useWallet();
  const [walletAddress, setWalletAddress] = useState(null);
  // const [connection] = useState(new Connection('https://api.devnet.solana.com'));
  // const [initializerAmount, setInitializerAmount] = useState('');
  // const [takerAmount, setTakerAmount] = useState('');

  // Function to connect to the wallet
  async function connectWallet() {
    // Check if the browser has an Ethereum provider (e.g., MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the signer
        const signer = provider.getSigner();

        // Get the user's address
        const address = await (await signer).getAddress();

        console.log('Connected address:', address);

        setWalletAddress(address);

        // You can now use the provider and signer to interact with the blockchain
        return { provider, signer };
      } catch (error) {
        console.error('Error connecting to the wallet:', error);
        NotificationService('Error!', NotificationType.DANGER, 'Ethereum wallet not found. Please install Phantom Wallet.');     
      }
    } else {
      console.error('No Ethereum provider found. Install MetaMask.');
      NotificationService('Error!', NotificationType.DANGER, 'No Ethereum provider found. Install MetaMask.');
    }
  }

  // Call the function to connect to the wallet
  connectWallet().then(({ provider, signer }) => {
    if (provider && signer) {
      console.log('Wallet connected successfully!');
      // Add your logic here to interact with the blockchain
    }
  });
  // Function to handle wallet connection

  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector(selectWalletAddress);
  const status = useSelector(selectWalletStatus);

  const handleGetWalletAddress = () => {
    console.log('Connected address:', address);

    setWalletAddress(address);
    dispatch(getWalletAddress());

  };

  const handleUpdateWalletAddress = (newAddress: string) => {
    dispatch(updateWalletAddress(newAddress));
  };


  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="built on Ethereum"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? 'Ethereum.png'
              : 'Ethereum.png'
          }
          height={1}
          width={1}
        />
      </Box>
      <Typography sx={{ color: 'blue' }} >
        Built on Ethereum
      </Typography>
      <Typography sx={{ color: 'blue' }} >
        ETHBerlin04
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'flex', fontSize: '50px' } }} alignItems={'center'} >
        <Box>
          <NavItem
            title={'Home'}
            id={'home-pages'}
            redirect={'/home'}
           
            // items={landingPages}
            colorInvert={colorInvert}
          />
        </Box>
        <Box marginLeft={4}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            target="blank"
            onClick={handleGetWalletAddress}
            size="large"
          >
            {walletAddress ? `Wallet Connected: ${walletAddress}` : 'Connect Wallet'}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
