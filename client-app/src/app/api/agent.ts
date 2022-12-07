import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../../models/activity';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(
  async (response) => {
    await sleep(2000);
    return response;
  },
  (error: AxiosError) => {
    const { data: d, status, config } = error.response!;
    let data: any = d;
    console.log(error.response);
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('Unauthorized');
        break;
      case 404:
        history.push('/not-found');
        toast.error('Not Found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Actvities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/activities/`, activity),
  update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

const agent = {
  Actvities,
};

export default agent;
