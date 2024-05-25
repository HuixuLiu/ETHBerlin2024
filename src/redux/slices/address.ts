import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { RootState } from '../store';

export interface WalletState {
  address: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WalletState = {
  address: null,
  status: 'idle',
};

// Function to connect to an Ethereum wallet and get the address
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await (await signer).getAddress();
    return address;
  } else {
    throw new Error('No Ethereum provider found');
  }
}

// Thunk to get the wallet address
export const getWalletAddress = createAsyncThunk(
  'wallet/getWalletAddress',
  async () => {
    const address = await connectWallet();
    return address;
  }
);

// Thunk to update the wallet address
export const updateWalletAddress = createAsyncThunk(
  'wallet/updateWalletAddress',
  async (newAddress: string) => {
    // Logic to update the wallet address can be placed here.
    // For simplicity, we're just returning the new address.
    return newAddress;
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWalletAddress.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'idle';
        state.address = action.payload;
      })
      .addCase(getWalletAddress.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateWalletAddress.fulfilled, (state, action: PayloadAction<string>) => {
        state.address = action.payload;
      });
  },
});

export const selectWalletAddress = (state: RootState) => state.wallet.address;
export const selectWalletStatus = (state: RootState) => state.wallet.status;

export default walletSlice.reducer;
