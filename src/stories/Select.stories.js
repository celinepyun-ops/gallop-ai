import { fn } from 'storybook/test';
import { Select } from './Select';

export default {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
};

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

export const Default = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
    onChange: fn(),
  },
};

export const WithPlaceholder = {
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    options: countryOptions,
    onChange: fn(),
  },
};

export const WithHelper = {
  args: {
    label: 'Region',
    options: countryOptions,
    value: 'us',
    helperText: 'Select the region for your campaign.',
    onChange: fn(),
  },
};

export const ErrorState = {
  args: {
    label: 'Category',
    placeholder: 'Select a category...',
    options: [
      { value: 'beauty', label: 'Beauty & Personal Care' },
      { value: 'health', label: 'Health & Household' },
      { value: 'home', label: 'Home & Kitchen' },
    ],
    helperText: 'Please select a category.',
    error: true,
    onChange: fn(),
  },
};

export const Disabled = {
  args: {
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
    ],
    value: 'active',
    disabled: true,
  },
};
