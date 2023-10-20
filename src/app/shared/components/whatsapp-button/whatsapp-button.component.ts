import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
})
export class WhatsappButtonComponent implements OnInit {
  svgWidth: number = 48;
  containerWidth: number = 80;
  // logoFontSize: number = 16;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.svgWidth = this.svgWidth / 2;
      this.containerWidth = this.containerWidth / 2;
    }, 3000);
  }
}
