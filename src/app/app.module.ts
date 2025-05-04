import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {environment} from "../environments/environment";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import InboxScreenComponent from "./components/inbox-screen.component";
import TasksState from "./state/task.state";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([TasksState], { // Enregistrez TasksState ici
      developmentMode: !environment.production,
    }),
    NgxsModule.forFeature([]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    InboxScreenComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
