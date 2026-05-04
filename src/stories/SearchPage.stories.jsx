import { SearchPage } from './SearchPage';

export default {
  title: 'Pages/Search',
  component: SearchPage,
  parameters: {
    layout: 'fullscreen',
  },
};

/** Default — product search with filters */
export const Default = {};

/** With saved lists — enables Add to List flow */
export const WithSavedLists = {
  args: {
    savedLists: [
      { id: 'list-1', name: 'Sunscreen', products: [], brands: [] },
      { id: 'list-2', name: 'Neck Cream', products: [], brands: [] },
    ],
  },
};

/** Empty results */
export const EmptyResults = {
  args: {
    products: [],
  },
};
