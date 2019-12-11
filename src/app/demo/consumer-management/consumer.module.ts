import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ListConsumerComponent } from './list';
import { ImportConsumerComponent } from './import';
import { ExportConsumerComponent } from './export';
import { EditConsumerComponent } from './edit';
import { CredentialComponent } from './credential-management/list';
import { EditCredentialComponent } from './credential-management/edit';

const declarations = [
  ListConsumerComponent,
  EditConsumerComponent,
  ImportConsumerComponent,
  ExportConsumerComponent,
  CredentialComponent,
  EditCredentialComponent,
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
