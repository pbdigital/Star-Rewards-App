import {ApiEndpoints} from 'Constants';
import {API} from './api';

class AuthService {
  static signUp = ({firstName, email, password}) => {
    return API.post(ApiEndpoints.signUp, {firstName, email, password});
  };

  static login = ({email, password}) => {
    return API.post(ApiEndpoints.login, {email, password});
  };

  static updateUserInfo = ({firstName, email, password}) => {
    const payload = {firstName, email, password};
    return API.put(ApiEndpoints.user, payload);
  };
}

export {AuthService};
