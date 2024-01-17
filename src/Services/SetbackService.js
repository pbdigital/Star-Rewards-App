import {ApiEndpoints} from 'Constants';
import {API} from './api';

const getSetbackEndpoint = ({childId, setbackId}) => {
  let endpoint = `${ApiEndpoints.children}/${childId}/setbacks`;
  if (setbackId) {
    endpoint = `${endpoint}/${setbackId}`;
  }
  return endpoint;
};

class SetbackService {
  static createChildSetback = ({childId, name, stars, emoji}) => {
    const endpoint = getSetbackEndpoint({childId});
    return API.post(endpoint, {name, stars, emoji});
  };

  static getChildSetback = ({childId, name, stars, emoji}) => {
    const endpoint = getSetbackEndpoint({childId});
    console.log("getChild endpoint", endpoint);
    return API.get(endpoint);
  };
}

export {SetbackService};
