import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { initialize, mswDecorator } from 'msw-storybook-addon';

addDecorator((story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

initialize();
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
