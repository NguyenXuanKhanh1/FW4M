import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './dashboard';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { AddServiceComponent } from './service-management/add-service/add-service.component';
import { ConsumerManagementComponent } from './consumer-management/consumer-management.component';
import { AddConsumerComponent } from './consumer-management/add-consumer/add-consumer.component';
import { EditConsumerComponent } from './consumer-management/edit-consumer/edit-consumer.component';


const declarations = [
  DashboardDemoComponent,
  ServiceManagementComponent,
  AddServiceComponent,
  ConsumerManagementComponent,
  AddConsumerComponent,
  EditConsumerComponent
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
