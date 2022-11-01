import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from '../../components/Title';

export default {
  title: 'Components/Title',
  component: Title
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: 'Example Text'
};
