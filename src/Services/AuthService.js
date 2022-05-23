import {ApiEndpoints} from '../Constants/ApiEndpoints';
import {API} from './api';

class AuthService {
  static signUp = ({firstName, email, password}) => {
    return API.post(ApiEndpoints.signUp, {firstName, email, password});
  };

  static login = ({email, password}) => {
    return API.post(ApiEndpoints.login, {email, password});
  };
}

export {AuthService};
