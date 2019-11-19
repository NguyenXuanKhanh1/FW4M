import { NgModule } from '@angular/core';
import { TabDemoComponent } from './tab';
import { ValidationDemoComponent } from './validation';
import { DashboardDemoComponent } from './dashboard';
import { ButtonDemoComponent } from './button';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { AddServiceComponent } from './service-management/add-service/add-service.component';
import { ConsumerManagementComponent } from './consumer-management/consumer-management.component';
import { AddConsumerComponent } from './consumer-management/add-consumer/add-consumer.component';


const declarations = [
  TabDemoComponent,
  ValidationDemoComponent,
  DashboardDemoComponent,
  ButtonDemoComponent,
  ServiceManagementComponent,
  AddServiceComponent,
  ConsumerManagementComponent,
  AddConsumerComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [
    FormsModule,
    HttpClientModule,
    Framework4CModule.forRoot(),
    BrowserModule
  ]
})

export class DemoModule { }
