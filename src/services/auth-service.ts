import http from '../utils/http';
import { ENDPOINT } from '../constants/api';
import { AxiosError, AxiosResponse } from 'axios';
import { Jose } from 'jose-jwe-jws';
import {AuthUser} from '../types/core/auth';
import { NotificationType } from '../enum/notifcation-type-enum';
import { NotificationService } from './notification-service';

const Auth = ENDPOINT.AUTH;

const AuthService = {
  validateJWT: async () => {
    try {
      const response: AxiosResponse = await http.get(Auth.VALIDATE);
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // NotificationService('Validate JWT Fail', NotificationType.DANGER, error.response?.data.message);
      }
      return error;
    }
  },

  encryptPassword: async (password: string) => {
    const getPublicKey = async () => {
      try {
        const response: AxiosResponse = await http.get(Auth.PUBLIC_KEY);
        if (response && response.data) {
          return response.data;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          NotificationService('Fail To Get Public Key', NotificationType.DANGER, error.response?.data.message);
        }
        return error;
      }
    };

    const bigIntToBase64 = (e: number)  => {
      // util function for convert big int in public key to base64
      let hex = e.toString(16);
      if (hex.length % 2) {
        hex = '0' + hex;
      }

      const bin = [];
      let d = 0;
      let b = '';
      for (let i = 0; i < hex.length; i += 2) {
        d = parseInt(hex.slice(i, i + 2), 16);
        b = String.fromCharCode(d);
        bin.push(b);
      }

      return btoa(bin.join(''));
    };

    let encrypted = '';
    const key = await getPublicKey();
    // console.log(key.n);
    // console.log(bigIntToBase64(parseInt(key.e)));
    const rsaKey = await Jose.Utils.importRsaPublicKey({
      kty: 'RSA',
      e: bigIntToBase64(parseInt(key.e)),
      n: key.n,
    }, 'RSA-OAEP');
    // console.log(rsaKey);
    const cryptographer = new Jose.WebCryptographer();
    const encryptor = new Jose.JoseJWE.Encrypter(cryptographer, rsaKey);
    encrypted = await encryptor.encrypt(`{"password":"${password}"}`);
    return encrypted;
  },

  login: async (username: string, password: string): Promise<AuthUser> => {
    try {
      const response: AxiosResponse = await http.post(Auth.LOGIN, {
        username: username,
        password: password
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService('Fail to Login', NotificationType.DANGER, error.response?.data.message);
      }
    }
    return null;
  },

  logOut: async () => {
    try {
      await http.delete(Auth.CLEAN);
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService('Fail To Logout', NotificationType.DANGER, error.response?.data.message);
      }
      return error;
    }
  }
};

export default AuthService;