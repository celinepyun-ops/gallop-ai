import { fn } from 'storybook/test';
import { Settings } from './Settings';

export default {
  title: 'Pages/Settings',
  component: Settings,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const Account = {
  args: {
    initialTab: 'account',
    onLogout: fn(),
    onSave: fn(),
  },
};

export const Subscription = {
  args: {
    initialTab: 'subscription',
    onLogout: fn(),
    onSave: fn(),
  },
};

export const Preferences = {
  args: {
    initialTab: 'preferences',
    onLogout: fn(),
    onSave: fn(),
  },
};
