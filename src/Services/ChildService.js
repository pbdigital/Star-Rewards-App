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

  static deleteChildTask = ({childId, taskId}) => {
    return API.delete(`${ApiEndpoints.children}/${childId}/tasks/${taskId}`);
  };

  static updateChildTask = ({childId, payload}) => {
    return API.put(
      `${ApiEndpoints.children}/${childId}/tasks/${payload?.id}`,
      payload,
    );
  };
  static getChildRewards = ({childId, time}) => {
    return API.get(`${ApiEndpoints.children}/${childId}/rewards?time=${time}`);
  };
}

export {ChildService};
