import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ListConsumerComponent } from './list/list-consumer.component';
import { AddConsumerComponent } from './add-consumer/add-consumer.component';
import { EditConsumerComponent } from './edit/edit-consumer.component';
import { ImportConsumerComponent } from './import/import-consumer.component';
import { ExportConsumerComponent } from './export/export-consumer.component';


const declarations = [
  ListConsumerComponent,
  AddConsumerComponent,
  EditConsumerComponent,
  ImportConsumerComponent,
  ExportConsumerComponent
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
  ]
})

export class ConsumerModule { }
