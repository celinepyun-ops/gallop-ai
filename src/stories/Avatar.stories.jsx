import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export const WithInitials = { args: { initials: 'CP', size: 'medium' } };
export const Small = { args: { initials: 'CP', size: 'small' } };
export const Medium = { args: { initials: 'CP', size: 'medium' } };
export const Large = { args: { initials: 'CP', size: 'large' } };

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar initials="CP" size="small" />
      <Avatar initials="CP" size="medium" />
      <Avatar initials="CP" size="large" />
    </div>
  ),
};
