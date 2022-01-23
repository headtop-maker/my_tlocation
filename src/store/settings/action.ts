export enum ActionType {
  changeTime = 'CHANGE_TIME',
  setDeviceId = 'SET_DEVICE_ID',
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
