import {AuthState, AuthUser} from '../../types/core/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

type AuthActionTypes = {
    [INITIALIZE]: {
        isAuthenticated: boolean;
        user: AuthUser;
    };
    [SIGN_IN]: {
        user: AuthUser;
    };
    [SIGN_OUT]: undefined;
    [SIGN_UP]: {
        user: AuthUser;
    };
};

export const authSlice = createSlice({
  name: 'authContent',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    Initialize: (state:AuthState, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isInitialized = true;
      state.user = action.payload.user;
    },
    SignIn: (state:AuthState, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload?.user;
    },
    SignOut: (state:AuthState) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    SignUp: (state:AuthState, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

  },
});

export const { Initialize,SignIn,SignOut,SignUp } = authSlice.actions;
export default authSlice.reducer;