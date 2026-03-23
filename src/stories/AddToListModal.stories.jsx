import { useState } from 'react';
import { AddToListModal } from './AddToListModal';
import { Button } from './Button';

export default {
  title: 'Components/AddToListModal',
  component: AddToListModal,
  parameters: {
    layout: 'centered',
  },
};

/** Interactive — click button to open modal */
const InteractiveTemplate = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Add to List" variant="primary" onClick={() => setOpen(true)} />
      <AddToListModal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdd={(listId) => console.log('Added to:', listId)}
      />
    </>
  );
};

export const Default = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    productName: 'TruSkin Vitamin C Serum',
  },
};

/** With custom lists */
export const CustomLists = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    productName: 'Beauty of Joseon Sunscreen SPF 50',
    lists: [
      { id: '1', name: 'My Favorites', itemCount: 3 },
      { id: '2', name: 'Q2 Campaign', itemCount: 15 },
    ],
  },
};

/** No existing lists */
export const NoLists = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    productName: 'Anua Heartleaf Toner',
    lists: [],
  },
};
