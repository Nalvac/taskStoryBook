import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TaskComponent} from "./task.commponent";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import PureTaskListComponent from "./pur-task-list.component";
import {ArchiveTask, PinTask, TaskStateModel} from "../state/task.state";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import TasksState from '../state/task.state';
import {Task} from "../models/task.model";

@Component({
  selector: 'app-task-list',
  template: `
    <app-pure-task-list
      [tasks]="tasks"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
  `,
  imports: [
    CommonModule,
    PureTaskListComponent
  ]
})
export class TaskListComponent implements  OnInit {

  tasks: Task[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(TasksState.getAllTasks).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: string) {
    this.store.dispatch(new ArchiveTask(id));
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: string) {
    this.store.dispatch(new PinTask(id));
  }

/*
  /!**
   *@ignore
   * Component property to define ordering of tasks
   *!/

  tasksInOrder: Task[] = [];

  private _tasks: Task[] = [];

  /!**
   * List of tasks
   *!/
  @Input()
  get tasks(): Task[] {
    return  this._tasks;
  };

  set tasks(tasks: Task[]) {
    const initialTasks = [
      ...tasks.filter(t => t.state === 'TASK_PINNED'),
      ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = initialTasks.filter(
      t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    this.tasksInOrder = filteredTasks.filter(
      t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
  }
  /!**
   * Check if it's loading state
   *!/
  @Input() loading: boolean = false;

  /!**
   * Event to change the task to pinned
   *!/
  @Output()
  onPinTask = new EventEmitter<Event>();

  /!**
   * Event to change the task to archived
   *!/
  @Output()
  onArchiveTask = new EventEmitter<Event>();
*/


}
