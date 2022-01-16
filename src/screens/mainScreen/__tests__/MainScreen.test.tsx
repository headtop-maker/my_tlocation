import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import MainScreen from '../index';

it('show user info', () => {
  const {getByText, getByPlaceholderText} = render(<MainScreen />);
  const showButton = getByText('Войти');

  const textInputEmail = getByPlaceholderText('Введите e-mail');
  const textInputPass = getByPlaceholderText('Введите пароль');

  const createEmailText = 'mail@mail.ru';
  const createPassword = '12345';

  fireEvent.changeText(textInputEmail, createEmailText);
  fireEvent.changeText(textInputPass, createPassword);
  fireEvent.press(showButton);

  const showItemMessage = getByText('Вы вошли как:');

  expect(showItemMessage).not.toBeNull();
});

it('hide user info', () => {
  const {getByText, getByPlaceholderText, getByTestId} = render(<MainScreen />);
  const showButton = getByText('Войти');

  const textInputEmail = getByPlaceholderText('Введите e-mail');
  const textInputPass = getByPlaceholderText('Введите пароль');

  const createEmailText = '';
  const createPassword = '';

  fireEvent.changeText(textInputEmail, createEmailText);
  fireEvent.changeText(textInputPass, createPassword);
  fireEvent.press(showButton);
  const showItemMessage = () => getByText('Вы вошли как:');

  expect(() => getByTestId('showEmail')).toThrow();

  expect(showItemMessage).toThrow();
});
