import {useRoutes} from 'react-router-dom';
import {Provider} from 'react-redux';
import Page from './components/Page';

import {CacheProvider} from '@emotion/react';

import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import createTheme from './theme';
import Routes from './Routes';
import useTheme from './hooks/useTheme';
import {store} from './redux/store';
import createCache from '@emotion/cache';
import {AuthProvider} from './contexts/JWTContext';
// import 'chart.js/auto';
import {ReactNotifications} from 'react-notifications-component';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';

import PropTypes from 'prop-types';
import AuthGuard from 'components/guards/AuthGuard';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const clientSideEmotionCache = createCache({key: 'css'});

function App({emotionCache = clientSideEmotionCache}) {
  const content = useRoutes(Routes);
  const {theme} = useTheme();
  const persistor = persistStore(store);
  const network = WalletAdapterNetwork.Devnet;




  return (
    <Page> 
      <CacheProvider value={emotionCache}>
        <ReactNotifications/>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>{content}</AuthProvider>      
          </PersistGate>
        </Provider>
      </CacheProvider>
    </Page> 
  );
}

App.propTypes = {
  emotionCache: PropTypes.object
};

export default App;
