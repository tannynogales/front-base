import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-shop-page-home',
  templateUrl: './shop-page-home.component.html',
  styleUrls: ['./shop-page-home.component.scss'],
})
export class ShopPageHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('miDiv', { static: true }) miDiv!: ElementRef;
  alturaDiv!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log(event);
    // Actualizar la altura del div cuando cambie el tamaño del navegador
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    console.log('Altura del div:', this.alturaDiv, 'px');
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // this.cd.detectChanges();
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    console.log('ngAfterViewInit', this.alturaDiv);
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    // this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('ngOnInit', this.alturaDiv);
  }

  hotProducts = [
    {
      title:
        'Revolvedora de Masas de productos electricos modernos y funcionales de gran calidad',
      image: './../../assets/tachos.png',
    },
    {
      title: 'Moledora de Carne',
      image: './../../assets/moledora.png',
    },
    {
      title: 'Motores Eléctricos',
      image: './../../assets/motor.png',
    },
    {
      title: 'Embutidoras de longanizas',
      image: './../../assets/churros.png',
    },
    {
      title: 'Batidoras',
      image: './../../assets/batidora.png',
    },
  ];

  menu = [
    {
      title: 'Refrigeración',
      link: '/refrigeracion',
    },
    {
      title: 'Gastronomía',
      link: '',
    },
    {
      title: 'Panadería',
      link: '',
    },
    {
      title: 'Comercio',
      link: '',
    },
    {
      title: 'Acero Inoxidable',
      link: '',
    },
    {
      title: 'Accesorios',
      link: '',
    },
  ];
}
