import TState from '../rootType';

export const getChangeTime = (state: TState) =>
  state.settingFormData.settingsForm.sendingTime;
