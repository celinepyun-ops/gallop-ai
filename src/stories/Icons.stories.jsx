import { Icons } from './icons';

export default {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

const IconCard = ({ name, icon }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid var(--color-border, #e5e5e5)',
    minWidth: '100px',
  }}>
    <span style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>{icon}</span>
    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary, #666)' }}>{name}</span>
  </div>
);

export const AllIcons = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <IconCard name="dashboard" icon={Icons.dashboard} />
      <IconCard name="campaigns" icon={Icons.campaigns} />
      <IconCard name="brands" icon={Icons.brands} />
      <IconCard name="analytics" icon={Icons.analytics} />
      <IconCard name="templates" icon={Icons.templates} />
      <IconCard name="contacts" icon={Icons.contacts} />
      <IconCard name="settings" icon={Icons.settings} />
      <IconCard name="profile" icon={Icons.profile} />
      <IconCard name="signout" icon={Icons.signout} />
      <IconCard name="search" icon={Icons.search} />
      <IconCard name="pricing" icon={Icons.pricing} />
      <IconCard name="bell" icon={Icons.bell} />
      <IconCard name="credits" icon={Icons.credits} />
      <IconCard name="sparkle" icon={Icons.sparkle} />
      <IconCard name="moon" icon={Icons.moon} />
    </div>
  ),
};

export const LogoMark = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--color-primary-600, #006400)' }}>{Icons.logo(24)}</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary, #666)' }}>24px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--color-primary-600, #006400)' }}>{Icons.logo(34)}</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary, #666)' }}>34px (sidebar)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--color-primary-600, #006400)' }}>{Icons.logo(48)}</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary, #666)' }}>48px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--color-primary-600, #006400)' }}>{Icons.logo(64)}</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary, #666)' }}>64px</span>
      </div>
    </div>
  ),
};
