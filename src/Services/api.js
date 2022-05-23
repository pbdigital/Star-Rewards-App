import {create} from 'apisauce';
import {BASE_URL} from '../Constants/ApiEndpoints';

const API = create({baseURL: BASE_URL});
const interceptors = API.axiosInstance.interceptors;

interceptors.request.use(request => {
  console.log({request});
  return request;
});

interceptors.response.use(
  response => {
    console.log({response});
    return response;
  },
  async error => {
    console.log({error});
    if (error.response.status === 401) {
      // await store.dispatch(userActions.logout());
      // navigate(Navigation.AuthStackNavigator);
    } else {
      return Promise.reject(error);
    }
  },
);

export {API};
