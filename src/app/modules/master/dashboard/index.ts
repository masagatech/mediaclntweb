import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { ProgressBarModule } from 'angular-progress-bar';

import { DashboardComponent } from './dashboard.comp';
export const routes = [
  {
    path: '', children: [
      { path: '', component: DashboardComponent },
    ]
  },
];


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'traveltrack.goyo.in',
  port: 9001,
  clean: true,
  connectOnCreate: false,
  keepalive: 60,
  reconnectPeriod: 1000,
};

@NgModule({
  declarations: [
    DashboardComponent
  ],

  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ProgressBarModule
  ],

  providers: []
})

export class DashboardModule {
  public static routes = routes;
}
