import { fn } from 'storybook/test';
import { Input } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = { args: { label: 'Email', placeholder: 'you@example.com' } };
export const WithHelper = { args: { label: 'Password', type: 'password', placeholder: 'Enter password', helperText: 'Must be at least 8 characters' } };
export const WithError = { args: { label: 'Email', placeholder: 'you@example.com', error: true, helperText: 'Please enter a valid email' } };
export const Disabled = { args: { label: 'Email', placeholder: 'you@example.com', disabled: true } };

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <Input label="Default" placeholder="Enter text..." onChange={fn()} />
      <Input label="With Helper" placeholder="Enter text..." helperText="This is helper text" onChange={fn()} />
      <Input label="Error State" placeholder="Enter text..." error helperText="This field is required" onChange={fn()} />
      <Input label="Disabled" placeholder="Enter text..." disabled onChange={fn()} />
    </div>
  ),
};
