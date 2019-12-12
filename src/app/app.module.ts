import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoModule } from './demo';
import { HttpClientModule } from '@angular/common/http';
import { IgxExcelExporterService } from 'igniteui-angular';
import { ExportFile } from './demo/shared/export';
import { ValidateConsumer } from './demo/shared/validate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    DemoModule
  ],
  providers: [
    ExportFile,
    ValidateConsumer,
    IgxExcelExporterService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
