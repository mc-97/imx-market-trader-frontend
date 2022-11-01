import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DefaultButton from '../../components/DefaultButton';

export default {
  title: 'Components/DefaultButton',
  component: DefaultButton
} as ComponentMeta<typeof DefaultButton>;

const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: 'Example Text'
};
