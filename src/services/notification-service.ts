import { ReactNotifications, Store } from 'react-notifications-component';
import React from 'react';
import {NOTIFICATION_TYPE} from 'react-notifications-component/dist/src/typings';
import {NotificationType} from '../enum/notifcation-type-enum';

export const NotificationService = (title: string, type: NotificationType, message: string) => {
  Store.addNotification({
    title: title,
    message: message,
    // type: success, warning, info, default
    type: type as NOTIFICATION_TYPE,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      // onScreen: true
    }
  });
};