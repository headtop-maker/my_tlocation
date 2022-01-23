import {ISettings} from './types';
import {ActionType} from './action';
import {AnyAction} from 'redux';

const initialState: ISettings = {
  settingsForm: {
    sendingTime: 1500,
    deviceID: '',
    remotedeviceID: '',
  },
};

const settingsFormReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.changeTime:
      return {
        ...state,
        settingsForm: {
          sendingTime: action.payload,
        },
      };

    case ActionType.setDeviceId:
      return {
        ...state,
        settingsForm: {
          deviceID: action.payload,
        },
      };

    case ActionType.setRemoteDeviceId:
      return {
        ...state,
        settingsForm: {
          remotedeviceID: action.payload,
        },
      };

    default:
      return state;
  }
};

export default settingsFormReducer;
