import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ListConsumerComponent } from './list';
import { ImportConsumerComponent } from './import';
import { ExportConsumerComponent } from './export';
import { EditConsumerComponent } from './edit';
import { ListGroupComponent } from './optional/group-management/list-group';
import { AddGroupComponent } from './optional/group-management/add-group';
import { OptionalConsumerComponent } from './optional';

const declarations = [
	ListConsumerComponent,
	EditConsumerComponent,
	ImportConsumerComponent,
	ExportConsumerComponent,
	ListGroupComponent,
	AddGroupComponent,
	OptionalConsumerComponent
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
