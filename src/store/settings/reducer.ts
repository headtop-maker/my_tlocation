import {ISettings} from './types';
import {ActionType} from './action';
import {AnyAction} from 'redux';

const initialState: ISettings = {
  remotedeviceID: '',
  deviceID: '',
  showInputModal: false,
  settingsForm: {
    sendingTime: 1500,
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
        deviceID: action.payload,
      };

    case ActionType.setRemoteDeviceId:
      return {
        ...state,
        remotedeviceID: action.payload,
      };
    case ActionType.setShowInputModal:
      return {
        ...state,
        showInputModal: action.payload,
      };

    default:
      return state;
  }
};

export default settingsFormReducer;
