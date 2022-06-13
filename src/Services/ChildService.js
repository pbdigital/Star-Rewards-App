import {ApiEndpoints} from '../Constants/ApiEndpoints';
import {API} from './api';

class ChildService {
  static getAllChildren = () => {
    const time = Date.now();
    return API.get(`${ApiEndpoints.children}?time=${time}`);
  };

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

  static createChildReward = ({
    childId,
    payload: {name, starsNeededToUnlock, emoji},
  }) => {
    const payload = {name, starsNeededToUnlock, emoji};
    return API.post(`${ApiEndpoints.children}/${childId}/rewards`, payload);
  };

  static awardRewardToChild = ({childId, rewardId, date}) => {
    return API.post(
      `${ApiEndpoints.children}/${childId}/rewards/${rewardId}/award?date=${date}`,
    );
  };

  static deleteChildReward = ({childId, rewardId}) => {
    return API.delete(
      `${ApiEndpoints.children}/${childId}/rewards/${rewardId}`,
    );
  };

  static updateChildReward = ({childId, rewardId, payload}) => {
    return API.put(
      `${ApiEndpoints.children}/${childId}/rewards/${rewardId}`,
      payload,
    );
  };

  static completeChildTask = ({childId, taskId, date}) => {
    const time = Date.now();
    return API.post(
      `${ApiEndpoints.children}/${childId}/tasks/${taskId}/complete?date=${date}&time=${time}`,
    );
  };

  static deleteChild = ({childId}) => {
    const time = Date.now();
    return API.delete(`${ApiEndpoints.children}/${childId}?time=${time}`);
  };
}

export {ChildService};
