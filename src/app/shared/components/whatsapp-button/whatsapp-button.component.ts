import { Component, Input, OnInit } from '@angular/core';
import { Site } from '@core/models';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
})
export class WhatsappButtonComponent implements OnInit {
  @Input({ required: true }) site!: Site;
  animation: boolean = true;

  svgWidth: number = 48;
  containerWidth: number = 80;
  // logoFontSize: number = 16;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.svgWidth = this.svgWidth / 1.5;
      this.containerWidth = this.containerWidth / 1.5;
      this.animation = false;
    }, 3000);
  }
}
