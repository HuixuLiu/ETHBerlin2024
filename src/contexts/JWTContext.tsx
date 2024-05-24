import {createContext, ReactNode, useEffect} from 'react';

import {JWTContextType} from '../types/core/auth';
import AuthService from '../services/auth-service';

import 'react-notifications-component/dist/theme.css';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { Initialize, SignIn, SignOut } from '../redux/slices/auth';


const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({children}: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const initialize = async () => {
      /** validate current jwt token when page is initialized **/
      try {
        const user = await AuthService.validateJWT();
        if (!user) {
          const payload = { 
            isAuthenticated: false,
            isInitialized: true,
            user: null
          };
          dispatch(Initialize(payload));
                        
        } else {
          const payload = {
            isAuthenticated: true,
            isInitialized: true,
            user: user,
          };
          dispatch(Initialize(payload));
        }
      } catch (err) {
        console.error(err);
        const payload = {
          isAuthenticated: false,
          isInitialized: true,
          user: null,
        };
        dispatch(Initialize(payload));
      }
    };

    initialize();
  }, []);

  const signIn = async (username: string, password: string): Promise<boolean> => {
    try {
      const encryptedPassword = await AuthService.encryptPassword(password);
      if (!encryptedPassword) {
        // TODO: show error
      } else {
        const user = await AuthService.login(username, encryptedPassword);
        if (user) {
          const payload = {
            user: user
          };
          dispatch(SignIn(payload));
          return true;
        }
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const signOut = async () => {
    try {
      await AuthService.logOut();
    } catch (err) {
      console.error(err);
    }

    dispatch(SignOut());
  };

  const signUp = async (
    // email: string,
    // password: string,
    // firstName: string,
    // lastName: string
  ) => {
    // const response = await axios.post("/api/auth/sign-up", {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // const { accessToken, user } = response.data;
    //
    // window.localStorage.setItem("accessToken", accessToken);
    // dispatch({
    //   type: SIGN_UP,
    //   payload: {
    //     user,
    //   },
    // });
  };

  const resetPassword = (email: string) => console.log(email);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};
