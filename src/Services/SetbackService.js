import {ApiEndpoints} from 'Constants';
import {API} from './api';
import moment from 'moment';

const getSetbackEndpoint = ({childId, setbackId}) => {
  let endpoint = `${ApiEndpoints.children}/${childId}/setbacks`;
  if (setbackId) {
    endpoint = `${endpoint}/${setbackId}`;
  }
  return endpoint;
};

class SetbackService {
  static createChildSetback = ({childId, payload}) => {
    const endpoint = getSetbackEndpoint({childId});
    const {name, stars, emoji} = payload;
    return API.post(endpoint, {name, stars, emoji});
  };

  static getChildSetback = ({childId, name, stars, emoji}) => {
    const endpoint = getSetbackEndpoint({childId});
    return API.get(endpoint);
  };

  static deleteChildSetback = ({childId, setbackId}) => {
    const endpoint = getSetbackEndpoint({childId, setbackId});
    return API.delete(endpoint);
  };

  static updateChildSetback = ({childId, payload}) => {
    const endpoint = getSetbackEndpoint({childId, setbackId: payload?.id});
    return API.put(endpoint, payload);
  };

  static issueChildSetback = ({
    childId,
    setbackId,
    date = moment().format('YYYY-MM-DD'),
  }) => {
    const endpoint = getSetbackEndpoint({childId, setbackId});
    return API.post(`${endpoint}/issue?date=${date}`);
  };
}

export {SetbackService};