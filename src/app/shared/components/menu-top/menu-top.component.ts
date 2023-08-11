import { Component, Input } from '@angular/core';

interface Item {
  title: string;
  link: string;
}

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss'],
})
export class MenuTopComponent {
  @Input() items: Item[] = [
    {
      title: 'Home',
      link: '/home',
    },
  ];
}
