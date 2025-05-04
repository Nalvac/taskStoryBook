
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';

import PureInboxScreenComponent from './pure-inbox-screen.component';
import {NgxsModule, Store} from "@ngxs/store";
import {importProvidersFrom} from "@angular/core";
import TasksState from "../state/task.state";
import {fireEvent, within} from "@storybook/test";

const meta: Meta<PureInboxScreenComponent> = {
  component: PureInboxScreenComponent,
  title: 'PureInboxScreen',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
    applicationConfig({
       providers: [Store, importProvidersFrom(NgxsModule.forRoot([TasksState]))],
    })
  ],
};

export default meta;
type Story = StoryObj<PureInboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulates pinning the first task
      await fireEvent.click(canvas.getByLabelText('pinTask-1'));
    // Simulates pinning the third task
      await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  },
};
