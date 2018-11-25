import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileInputComponent } from './file-input/file-input.component';
import { FileReadingComponent } from './file-reading/file-reading.component';
import { TextDisplayComponent } from './text-display/text-display.component';

const routes: Routes = [
  {path: 'file-input', component: FileInputComponent},
  {path: 'file-reading', component: FileReadingComponent},
  {path: 'text-display', component: TextDisplayComponent},
  {path: '', redirectTo: 'file-input', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
