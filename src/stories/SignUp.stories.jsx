import { fn } from 'storybook/test';
import { SignUp } from './SignUp';

export default {
  title: 'Pages/Sign Up',
  component: SignUp,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    onSignUp: fn(),
    onLoginClick: fn(),
  },
};
