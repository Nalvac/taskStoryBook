import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-task',
  template: `
    <div class="list-item {{ task?.state }}">
      <label
        [attr.aria-label]="'archiveTask-' + task?.id"
        for="checked-{{ task?.id }}"
        class="checkbox"
      >
        <input
          type="checkbox"
          disabled="true"
          [defaultChecked]="task?.state === 'TASK_ARCHIVED'"
          name="checked-{{ task?.id }}"
          id="checked-{{ task?.id }}"
        />
        <span class="checkbox-custom" (click)="onArchive(task?.id)"></span>
      </label>
      <label
        [attr.aria-label]="task?.title + ''"
        for="title-{{ task?.id }}"
        class="title-wrapper"
      >
        <input
          type="text"
          [value]="task?.title"
          readonly="true"
          id="title-{{ task?.id }}"
          name="title-{{ task?.id }}"
          placeholder="Input title"
        />
      </label>
      <button
        *ngIf="task?.state !== 'TASK_ARCHIVED'"
        class="pin-button"
        [attr.aria-label]="'pinTask-' + task?.id"
        (click)="onPin(task?.id)"
      >
        <span class="icon-star"></span>
      </button>
    </div>
  `,


  imports: [
    CommonModule
  ]
})
export class TaskComponent {

  /**
   * The shape of the task
   */
  @Input() task: any;

  @Output()
  onPinTask = new EventEmitter<any>();

  @Output()
  onArchiveTask = new EventEmitter<any>();

  /**
   * @ignore
   * Component method to trigger the pin event
   * @param id string
   */
  onPin(id: string) {
    this.onPinTask.emit(id);
  }

  /**
   * @ignore
   * Component method to trigger the archive event
   * @param id string
   */
  onArchive(id: string) {
    this.onArchiveTask.emit(id);
  }

}
