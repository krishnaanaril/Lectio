import { Component, OnInit } from '@angular/core';
import { Tesseract } from 'tesseract.ts';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Language } from '../shared/models/language';
import { DataService } from '../shared/services/data.service';
import { LogService } from '../shared/services/log.service';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';


@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.sass']
})
export class FileInputComponent implements OnInit {

  languages: Array<Language>;
  selectedLanguage: string;
  data: string;
  resultText: string;
  isProcessing: boolean;
  imageSelected: boolean;
  fileInputPlaceHolder: string;

  constructor(private service: DataService
    , private log: LogService
    , private dialog: MatDialog
  , private router: Router) { }

  ngOnInit() {
    this.fileInputPlaceHolder = 'Choose an image';
    this.imageSelected = false;
    this.service.getLanguages().subscribe((res: Array<Language>) => {
      this.languages = res;
      this.log.info(this.languages.length);
    }, (err) => {
      this.log.error(err);
    }, () => {
      this.selectedLanguage = this.languages[14].code;
    });
    this.isProcessing = false;
  }

  fileChanged(e) {
    if (e.srcElement.files.length > 0) {
      this.fileInputPlaceHolder = e.srcElement.files[0].name;
      this.imageSelected = true;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.srcElement.files[0]);
      reader.onload = () => {
        this.data = <string>reader.result;
      };
      reader.onerror = (err) => {
        throw err;
      };
    }
  }

  getText(e) {
    this.log.info('in get text');
    this.log.info(this.selectedLanguage);
    const myImage = this.data;
    const dialogRef: MatDialogRef<ProgressSpinnerComponent> = this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    Tesseract.recognize(myImage)
      .progress((message: any) => {
        console.log(message);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .then((result: any) => {
        this.resultText = result.text;
        this.router.navigate(['/text-display'], {queryParams: {text: this.resultText}});
      })
      .finally((resultOrError: any) => {
        // TODO
        dialogRef.close();
      });
  }
}

