import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<app-inbox-screen></app-inbox-screen>`,
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'taskbox';
}
