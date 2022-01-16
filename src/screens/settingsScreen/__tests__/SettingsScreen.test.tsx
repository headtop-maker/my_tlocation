import React from 'react';
import {AnyAction, createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import SettingsScreen from '..';

afterEach(cleanup);

const startingState = {
  settingsForm: {
    sendingTime: 1500,
  },
};

function reducer(state = startingState, action: AnyAction) {
  switch (action.type) {
    case 'CHANGE_TIME':
      return {
        ...state,
        settingsForm: {
          sendingTime: action.payload,
        },
      };
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it('render with redux', () => {
  const {getByTestId} = renderWithRedux(<SettingsScreen />);
});
