import {ApiEndpoints} from '../Constants/ApiEndpoints';
import {API} from './api';

class ChildService {
  static addChild = ({name, avatarId}) => {
    return API.post(ApiEndpoints.children, {name, avatarId});
  };
}

export {ChildService};
