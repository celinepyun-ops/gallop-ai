import { useState } from 'react';
import { fn } from 'storybook/test';
import { Select } from './Select';

const sampleOptions = [
  { value: 'us', label: 'Amazon US' },
  { value: 'uk', label: 'Amazon UK' },
  { value: 'de', label: 'Amazon DE' },
  { value: 'jp', label: 'Amazon JP' },
];

export default {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = { args: { label: 'Marketplace', options: sampleOptions, placeholder: 'Select a marketplace...' } };
export const WithValue = { args: { label: 'Marketplace', options: sampleOptions, value: 'us' } };
export const WithHelper = { args: { label: 'Marketplace', options: sampleOptions, placeholder: 'Select...', helperText: 'Choose your target marketplace' } };
export const WithError = { args: { label: 'Marketplace', options: sampleOptions, placeholder: 'Select...', error: true, helperText: 'Selection is required' } };
export const Disabled = { args: { label: 'Marketplace', options: sampleOptions, value: 'us', disabled: true } };

export const Interactive = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: '320px' }}>
        <Select
          label="Category"
          placeholder="Select a category..."
          options={[
            { value: 'beauty', label: 'Beauty & Personal Care' },
            { value: 'health', label: 'Health & Household' },
            { value: 'home', label: 'Home & Kitchen' },
            { value: 'sports', label: 'Sports & Outdoors' },
            { value: 'electronics', label: 'Electronics' },
          ]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Selected: {value || 'none'}
        </p>
      </div>
    );
  },
};
