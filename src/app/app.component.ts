import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Tesseract } from 'tesseract.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('canvasElement') canvasElement: any;
  @ViewChild('imageElement') imageElement: any;
  video: any;
  canvas: any;
  image: any;
  streaming: boolean;
  width = 320;    // We will scale the photo width to this
  height = 0;     // This will be computed based on the input stream
  data: string;
  resultText: string;

  ngOnInit() {
    // this.video = this.videoElement.nativeElement;
    // this.canvas = this.canvasElement.nativeElement;
    this.image = this.imageElement.nativeElement;
    this.streaming = false;
    // this.start();
    // this.video.addEventListener('canplay', (ev) => {
    //   console.log('in can play event');
    //   if (!this.streaming) {
    //     this.height = this.video.videoHeight / (this.video.videoWidth / this.width);
    //     this.video.setAttribute('width', this.width);
    //     this.video.setAttribute('height', this.height);
    //     this.canvas.setAttribute('width', this.width);
    //     this.canvas.setAttribute('height', this.height);
    //     this.streaming = true;
    //   }
    // }, false);
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }
  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }

  onImageChange(e) {
    if (e.srcElement.files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.srcElement.files[0]);
      reader.onload = () => {
        this.data = <string>reader.result;
        this.image.setAttribute('src', this.data);
      };
      reader.onerror = (err) => {
        throw err;
      };
    }
  }

  // clearphoto() {
  //   const context = this.canvas.getContext('2d');
  //   context.fillStyle = '#AAA';
  //   context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  //   const data = this.canvas.toDataURL('image/png');
  //   this.image.setAttribute('src', data);
  // }

  // takepicture() {
  //   console.log('in take picture');
  //   const context = this.canvas.getContext('2d');
  //   if (this.width && this.height) {
  //     this.canvas.width = this.width;
  //     this.canvas.height = this.height;
  //     context.drawImage(this.video, 0, 0, this.width, this.height);

  //     this.data = this.canvas.toDataURL('image/png');
  //     this.image.setAttribute('src', this.data);
  //   } else {
  //     this.clearphoto();
  //   }
  // }

  getText() {
    console.log('in get text');
    // const myImage = this.canvas.toDataURL('image/png');
    const myImage = this.data;
    Tesseract.recognize(myImage)
      .progress((message: any) => {
        console.log(message);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .then((result: any) => {
        console.log(result.text);
        this.resultText = result.text;
      })
      .finally((resultOrError: any) => {
        console.log('In finally...');
      });
  }
}
