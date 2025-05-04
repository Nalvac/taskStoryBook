import {TaskComponent} from "./task.commponent";
import {fn} from "@storybook/test";
import {Meta, StoryObj} from "@storybook/angular";

export const ActionsData = {
  onPinTask: fn(),
  onArchiveTask: fn(),
}

const meta: Meta<TaskComponent> = {
  title: 'Task stories',
  component: TaskComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData
  }
}

export default meta;
type Story = StoryObj<TaskComponent>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: 'TASK_ARCHIVED',
    },
  },
};
