
import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";
import {TaskListComponent} from "./task-list.component";

@Component({
  selector: 'app-pure-inbox-screen',
  template: `
    <div *ngIf="error" class="page lists-show">
      <div class="wrapper-message">
        <span class="icon-face-sad"></span>
        <p class="title-message">Oh no!</p>
        <p class="subtitle-message">Something went wrong</p>
      </div>
    </div>

    <div *ngIf="!error" class="page lists-show">
      <nav>
        <h1 class="title-page">Taskbox</h1>
      </nav>
      <app-task-list></app-task-list>
    </div>
  `,
  imports: [CommonModule, TaskListComponent]
})
export default class PureInboxScreenComponent {
  @Input() error: any;
}
