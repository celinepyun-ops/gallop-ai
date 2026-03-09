import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export const Success = { args: { label: 'Active', variant: 'success' } };
export const Warning = { args: { label: 'Pending', variant: 'warning' } };
export const Error = { args: { label: 'Paused', variant: 'error' } };
export const Info = { args: { label: 'New', variant: 'info' } };

export const Small = { args: { label: 'Small', variant: 'info', size: 'small' } };
export const Medium = { args: { label: 'Medium', variant: 'info', size: 'medium' } };
export const Large = { args: { label: 'Large', variant: 'info', size: 'large' } };

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge label="Active" variant="success" />
      <Badge label="Pending" variant="warning" />
      <Badge label="Paused" variant="error" />
      <Badge label="New" variant="info" />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge label="Small" variant="success" size="small" />
      <Badge label="Medium" variant="success" size="medium" />
      <Badge label="Large" variant="success" size="large" />
    </div>
  ),
};
