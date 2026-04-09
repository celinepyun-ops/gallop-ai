import { ListsPage } from './ListsPage';

export default {
  title: 'Pages/ListsPage',
  component: ListsPage,
  parameters: {
    layout: 'padded',
  },
};

/** Default — 3 lists with mock data */
export const Default = {};

/** Empty — no lists yet */
export const Empty = {
  args: {
    initialLists: [],
  },
};

/** Single List — one list with tabs */
export const SingleList = {
  args: {
    initialLists: [
      {
        id: 'list-1',
        name: 'Sunscreen Brands',
        tabs: [
          {
            id: 'tab-1a',
            name: 'SPF Products',
            items: [
              { id: 'i1', productId: 'B09XYZ1234', brandName: 'SunShield Pro', salesRank: 8200, monthlyRevenue: 67000, addedAt: '2026-03-10' },
              { id: 'i2', productId: 'B09ABC5678', brandName: 'EcoGlow Naturals', salesRank: 15400, monthlyRevenue: 42000, addedAt: '2026-03-08' },
            ],
          },
          {
            id: 'tab-1b',
            name: 'After-Sun Care',
            items: [
              { id: 'i3', productId: 'B09DEF9012', brandName: 'CoolAloe Gel', salesRank: 18000, monthlyRevenue: 28000, addedAt: '2026-03-12' },
            ],
          },
        ],
      },
    ],
  },
};
