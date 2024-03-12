import {ApiEndpoints} from 'Constants';
import {API} from './api';

class AuthService {
  static signUp = ({firstName, email, password}) => {
    return API.post(ApiEndpoints.signUp, {firstName, email, password});
  };

  static login = ({email, password}) => {
    return API.post(ApiEndpoints.login, {email, password});
  };

  static loginApple = params => {
    return API.post(ApiEndpoints.loginApple, params);
  };

  static signUpApple = params => {
    return API.post(ApiEndpoints.signUpApple, params);
  };

  static updateUserInfo = ({firstName, email, password}) => {
    const payload = {firstName, email, password};
    return API.put(ApiEndpoints.user, payload);
  };
}

export {AuthService};
