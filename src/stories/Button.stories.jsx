import { fn } from 'storybook/test';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const Primary = { args: { variant: 'primary', label: 'Primary Button' } };
export const Secondary = { args: { variant: 'secondary', label: 'Secondary Button' } };
export const Outline = { args: { variant: 'outline', label: 'Outline Button' } };
export const Ghost = { args: { variant: 'ghost', label: 'Ghost Button' } };
export const Danger = { args: { variant: 'danger', label: 'Danger Button' } };

export const Small = { args: { variant: 'primary', size: 'small', label: 'Small' } };
export const Medium = { args: { variant: 'primary', size: 'medium', label: 'Medium' } };
export const Large = { args: { variant: 'primary', size: 'large', label: 'Large' } };

export const Disabled = { args: { variant: 'primary', label: 'Disabled', disabled: true } };

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" label="Primary" onClick={fn()} />
      <Button variant="secondary" label="Secondary" onClick={fn()} />
      <Button variant="outline" label="Outline" onClick={fn()} />
      <Button variant="ghost" label="Ghost" onClick={fn()} />
      <Button variant="danger" label="Danger" onClick={fn()} />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="small" label="Small" onClick={fn()} />
      <Button variant="primary" size="medium" label="Medium" onClick={fn()} />
      <Button variant="primary" size="large" label="Large" onClick={fn()} />
    </div>
  ),
};
