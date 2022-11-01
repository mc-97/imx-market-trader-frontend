import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DefaultSnackbar from '../../components/DefaultSnackbar';

export default {
  title: 'Components/DefaultSnackbar',
  component: DefaultSnackbar
} as ComponentMeta<typeof DefaultSnackbar>;

const Template: ComponentStory<typeof DefaultSnackbar> = (args) => <DefaultSnackbar {...args} />;

export const Success = Template.bind({});

const mockHandleClose = () => {
  //do nothing
};

Success.args = {
  open: true,
  handleClose: mockHandleClose,
  message: 'Example Text'
};

export const Info = Template.bind({});

Info.args = {
  open: true,
  handleClose: mockHandleClose,
  severity: 'info',
  message: 'Example Text'
};

export const Warning = Template.bind({});

Warning.args = {
  open: true,
  handleClose: mockHandleClose,
  severity: 'warning',
  message: 'Example Text'
};

export const Error = Template.bind({});

Error.args = {
  open: true,
  handleClose: mockHandleClose,
  severity: 'error',
  message: 'Example Text'
};
