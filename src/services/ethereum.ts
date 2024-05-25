import http from '../utils/http';
import { ENDPOINT } from '../constants/api';
import { AxiosError, AxiosResponse } from 'axios';
import {AuthUser} from '../types/core/auth';
import { NotificationType } from '../enum/notifcation-type-enum';
import { NotificationService } from './notification-service';

const Eth = ENDPOINT.ETH;

const EthereumService = {
  uploadData: async (address: string, publicKey: string, signature: string, age: number, isDoctor: string, isDriver: string): Promise<AuthUser> => {
    try {
      const response: AxiosResponse = await http.post(Eth.UPLOAD, {
        address: address,
        publicKey: publicKey,
        signature: signature,
        msg: age,
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        NotificationService('Failed to Upload Data to server', NotificationType.DANGER, error.response?.data.message);
      }
    }
    return null;
  },

  
};

export default EthereumService;