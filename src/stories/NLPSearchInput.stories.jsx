import { NLPSearchInput } from './NLPSearchInput';

export default {
  title: 'Components/NLPSearchInput',
  component: NLPSearchInput,
  parameters: {
    layout: 'padded',
  },
};

/** Default — empty input with suggestion dropdown on focus */
export const Default = {
  args: {
    onSearch: (keyword, type) => console.log('Search:', keyword, type),
    onFiltersDetected: (filters) => console.log('Filters:', filters),
  },
};
