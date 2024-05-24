import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {ENDPOINT, HTTP_METHOD, XSRF_COOKIE, XSRF_TOKEN} from '../constants/api';

const http: AxiosInstance = axios.create({
  withCredentials: true,
  //baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://localhost:8080',
  timeout: 5000
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    if (config.method === HTTP_METHOD.GET.toLowerCase()) {
      return config;
    }

    const headers = config.headers;
    // console.log('config.headers.getContentType');
    // console.log(config.headers.getContentType);

    if (config.method === HTTP_METHOD.POST.toLowerCase() || config.method === HTTP_METHOD.PATCH.toLowerCase()) {
      // add header
      // TODO: check if it is needed to add this header
      // headers['Content-Type'] = 'application/json';
    }

    let token_name = XSRF_COOKIE.AUTH;
    let token_key = XSRF_TOKEN.AUTH;
    let token_value = '';
    let token_url = ENDPOINT.AUTH.CSRF;

    for (const prefix in ENDPOINT) {
      const endPoint = ENDPOINT[prefix];
      if (Object.values(endPoint).includes(config.url)) {
        token_key = XSRF_TOKEN[prefix];
        token_name = XSRF_COOKIE[prefix];
        token_url = endPoint.CSRF;
      }
    }

    if (document.cookie) {
      token_value = document.cookie.split(token_name + '=')?.[1].split(';')?.[0];
    }
    if (!token_value) {
      await XSRF_TOKEN.getToken(token_url);
      token_value = document.cookie.split(token_name + '=')?.[1].split(';')?.[0];
      headers[token_key] = token_value;
    } else {
      headers[token_key] = token_value;
    }

    return config;
  },
  (error: AxiosError) => {
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default http;
