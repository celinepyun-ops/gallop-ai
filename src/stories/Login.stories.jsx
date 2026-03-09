import { fn } from 'storybook/test';
import { Login } from './Login';

export default {
  title: 'Pages/Login',
  component: Login,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    onLogin: fn(),
    onSignUpClick: fn(),
    onForgotPassword: fn(),
  },
};
