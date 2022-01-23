export enum ActionType {
  changeTime = 'CHANGE_TIME',
  setDeviceId = 'SET_DEVICE_ID',
  setRemoteDeviceId = 'SET_REMOTE_DEVICE_ID',
}

export const changeTimeAction = (sendingTime: number) => {
  return {
    type: ActionType.changeTime,
    payload: sendingTime,
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
