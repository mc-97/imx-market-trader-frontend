import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Collections from '../../pages/Collections/Collections';
import { withLayout } from '../withLayout';
import { mockCollectionsHandlers } from '../../mocks/handlers/mockCollectionsHandlers';

export default {
  title: 'Pages/Collections',
  component: Collections,
  decorators: [withLayout]
} as ComponentMeta<typeof Collections>;

const Template: ComponentStory<typeof Collections> = () => <Collections />;

export const Example = Template.bind({});

Example.parameters = {
  msw: {
    handlers: mockCollectionsHandlers
  }
};
