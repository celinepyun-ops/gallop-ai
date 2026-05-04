import { SavedListsPage } from './SavedListsPage';

export default {
  title: 'Pages/Lists',
  component: SavedListsPage,
  parameters: {
    layout: 'fullscreen',
  },
};

/** Default — CRM table view with all contacts */
export const Default = {};

/** With New List callback */
export const WithNewList = {
  args: {
    onAddNewList: (name) => console.log('New list:', name),
  },
};
