import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@components/Form';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['error', 'success', null]
    },
    disabled: {
      control: 'boolean',
    }
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "First name"
  },
};
