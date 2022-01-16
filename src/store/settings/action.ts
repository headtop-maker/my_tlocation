export enum ActionType {
  changeTime = 'CHANGE_TIME',
}

export const changeTimeAction = (sendingTime: number) => {
  return {
    type: ActionType.changeTime,
    payload: sendingTime,
  };
};
