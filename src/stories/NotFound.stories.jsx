import { fn } from 'storybook/test';
import { NotFound } from './NotFound';

export default {
  title: 'Pages/404 Not Found',
  component: NotFound,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    onBackClick: fn(),
  },
};
