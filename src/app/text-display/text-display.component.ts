import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';

import { LogService } from '../shared/services/log.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.sass']
})
export class TextDisplayComponent implements OnInit {
  @ViewChild('textArea') textElement: any;
  resultText: string;
  resultRows: number;

  constructor(private route: ActivatedRoute
    , private log: LogService
    , private location: Location) {
    this.resultText = '';
  }

  ngOnInit() {
    this.resultText = this.route.snapshot.queryParamMap.get('text');
    this.log.info(this.resultText);
    this.resultRows = this.resultText.split(/\r\n|\r|\n/).length;
  }

  back() {
    this.location.back();
  }

  copy() {
    this.textElement.nativeElement.select();
    document.execCommand('copy');
  }
}
