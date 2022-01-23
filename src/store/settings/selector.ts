import TState from '../rootType';

export const getChangeTime = (state: TState) =>
  state.settingFormData.settingsForm.sendingTime;

export const getGetDeviceId = (state: TState) =>
  state.settingFormData.settingsForm.deviceID;

export const getRemoteDeviceId = (state: TState) =>
  state.settingFormData.settingsForm.remotedeviceID;
