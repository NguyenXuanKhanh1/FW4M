import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './dashboard';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConsumerModule } from './consumer-management/index';



const declarations = [
  DashboardDemoComponent,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [
    FormsModule,
    HttpClientModule,
    Framework4CModule.forRoot(),
    BrowserModule,
    ConsumerModule
  ]
})

export class DemoModule { }
