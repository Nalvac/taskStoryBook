import {Task} from "../models/task.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Inject, Injectable} from "@angular/core";
import {patch, updateItem} from "@ngxs/store/operators";

export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
  ERROR: 'APP_ERROR',
}

export class ArchiveTask{
  static  readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: string) {
  }
}

export class PinTask{
  static  readonly type = actions.PIN_TASK;

  constructor(public payload: string) {
  }
}

export class AppError{
  static  readonly type = actions.ERROR;

  constructor(public payload: boolean) {
  }
}


const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

export interface TaskStateModel {
  tasks: Task[];
  status: 'idle' | 'loading' | 'error' | 'success';
  error: boolean;
}

@State<TaskStateModel>({
  name: 'taskBox',
  defaults: {
    tasks: defaultTasks,
    status: 'idle',
    error: false
  },
})
@Injectable()
export default class TasksState {
  @Selector()
  static getError(state: TaskStateModel) {
    return state.error;
  }

  @Selector()
  static getAllTasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Action(PinTask)
  pinTask({getState, setState}: StateContext<TaskStateModel>, {payload}: PinTask) {
    const task = getState().tasks.find((task) => task.id === payload);

    if (task) {
      const updatedTask: Task = {
        ...task,
        state: 'TASK_PINNED'
      }

      setState(patch({tasks: updateItem<Task>( (pinnedTask) => pinnedTask?.id === payload, updatedTask)}));
    }
  }
  @Action(ArchiveTask)
  archiveTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: ArchiveTask
  ) {
    const task = getState().tasks.find((task) => task.id === payload);
    if (task) {
      const updatedTask: Task = {
        ...task,
        state: 'TASK_ARCHIVED',
      };
      setState(
        patch({
          tasks: updateItem<Task>(
            (archivedTask) => archivedTask?.id === payload,
            updatedTask
          ),
        })
      );
    }
  }
  @Action(AppError)
  setAppError({patchState, getState}: StateContext<TaskStateModel>, {payload}: AppError) {
    const state = getState();
    patchState({
      error: !state.error
    });
  }
}
