export enum ActionType {
  changeTime = 'CHANGE_TIME',
  setDeviceId = 'SET_DEVICE_ID',
  setRemoteDeviceId = 'SET_REMOTE_DEVICE_ID',
  setShowInputModal = 'SET_SHOW_INPUT_MODAL',
}

export const changeTimeAction = (sendingTime: number) => {
  return {
    type: ActionType.changeTime,
    payload: sendingTime,
  };
};

export const setShowInputModalAction = (isShow: boolean) => {
  return {
    type: ActionType.setShowInputModal,
    payload: isShow,
  };
};

export const setDeviceIdAction = (deviceID: string) => {
  return {
    type: ActionType.setDeviceId,
    payload: deviceID,
  };
};

export const setRemoteDeviceIdAction = (remoteDeviceID: string) => {
  return {
    type: ActionType.setRemoteDeviceId,
    payload: remoteDeviceID,
  };
};
