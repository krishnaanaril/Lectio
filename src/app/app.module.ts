import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LectioMaterialModuleModule } from './lectio-material-module/lectio-material-module.module';
import { FileInputComponent } from './file-input/file-input.component';
import { FileReadingComponent } from './file-reading/file-reading.component';
import { TextDisplayComponent } from './text-display/text-display.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FileInputComponent,
    FileReadingComponent,
    TextDisplayComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LectioMaterialModuleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProgressSpinnerComponent]
})
export class AppModule { }
