import type { Meta, StoryObj } from '@storybook/react';
import { ComponentOrLoader } from '@components/ComponentOrLoader';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof ComponentOrLoader> = {
  title: 'ComponentOrLoader',
  component: ComponentOrLoader,
  tags: ['autodocs'],
  argTypes: {
    data: {
      options: [null, 'data'],
      control: { type: 'radio' },
    }
  },
};

export default meta;
type Story = StoryObj<typeof ComponentOrLoader>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  render: (args) => <ComponentOrLoaderWithControl loadingData={!args.data} />
};

function ComponentOrLoaderWithControl({ loadingData }: { loadingData: boolean }) {
  return (
    <ComponentOrLoader data={!loadingData ? { name: 'world' } : null} Component={DemoComponent} />
  )
}

function DemoComponent({ name }: { name: string }) {
  return (
    <div>Hello {name}!</div>
  )
}
