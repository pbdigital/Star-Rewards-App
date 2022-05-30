import {ApiEndpoints} from '../Constants/ApiEndpoints';
import {API} from './api';

class ChildService {
  static addChild = ({name, avatarId}) => {
    return API.post(ApiEndpoints.children, {name, avatarId});
  };

  static updateChild = ({childId, name, avatarId}) => {
    return API.put(`${ApiEndpoints.children}/${childId}`, {name, avatarId});
  };

  static createChildTask = (
    childId,
    {name, daysofWeek, starsAwarded, isBonusTask},
  ) => {
    const payload = {name, daysofWeek, starsAwarded, isBonusTask};
    return API.post(`${ApiEndpoints.children}/${childId}/tasks`, payload);
  };

  static getChildTasks = ({childId, time}) => {
    return API.get(`${ApiEndpoints.children}/${childId}/tasks?time=${time}`);
  };
}

export {ChildService};
