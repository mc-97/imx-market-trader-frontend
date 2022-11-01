import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { mockDashboardHandlers } from '../../mocks/handlers/mockDashboardHandlers';
import { withLayout } from '../withLayout';

export default {
  title: 'Pages/Dashboard',
  component: Dashboard,
  decorators: [withLayout]
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => <Dashboard />;
export const Example = Template.bind({});

Example.parameters = {
  msw: {
    handlers: mockDashboardHandlers
  }
};
