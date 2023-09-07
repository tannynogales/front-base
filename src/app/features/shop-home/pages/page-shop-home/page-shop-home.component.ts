import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoriesService } from '@core/services';
import { Category, CategoryObject } from '@core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-shop-home',
  templateUrl: './page-shop-home.component.html',
  styleUrls: ['./page-shop-home.component.scss'],
})
export class PageShopHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('miDiv', { static: true }) miDiv!: ElementRef;
  alturaDiv!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log(event);
    // Actualizar la altura del div cuando cambie el tamaño del navegador
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('Altura del div:', this.alturaDiv, 'px');
  }

  category$: Observable<CategoryObject>;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private categoriesService: CategoriesService
  ) {
    this.category$ = this.categoriesService.categories$;
  }

  ngAfterViewInit(): void {
    // this.cd.detectChanges();
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('ngAfterViewInit', this.alturaDiv);
    this.changeDetectorRef.detectChanges();
  }

  // productList: any;
  ngOnInit(): void {
    // this.productsService.fetch();
    // this.productsService.getTest$().subscribe((data) => {
    //   this.productList = data;
    //   console.log(data);
    // });
    // this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('ngOnInit', this.alturaDiv);
  }

  hotProducts: Category[] = [
    {
      id: 1,
      name: 'Motores Eléctricos',
      slug: 'motores-electricos',
      image: './../../assets/motor.png',
    },
    {
      id: 1,
      name: 'Picadora de Papas Fritas y Cebollas',
      slug: 'picadora-de-papas',
      image: './../../assets/picadora-papas.png',
    },
    {
      id: 1,
      name: 'Canastillo para Freidoras',
      slug: 'canastillo',
      image: './../../assets/canastillo.png',
    },
    {
      id: 1,
      name: 'Deposito Gastronomico de Acero',
      slug: 'deposito-gastronomico',
      image: './../../assets/tachos.png',
    },
    {
      id: 1,
      name: 'Termómetro',
      slug: 'termometro',
      image: './../../assets/termometro.png',
    },

    {
      id: 1,
      name: 'Moledora de Carne',
      slug: 'moledora',
      image: './../../assets/moledora.png',
    },

    {
      id: 1,
      name: 'Embutidoras de longanizas',
      slug: 'embutidoras',
      image: './../../assets/churros.png',
    },
    {
      id: 1,
      name: 'Batidoras',
      slug: 'batidoras',
      image: './../../assets/batidora.png',
    },
  ];

  menu: Category[] = [
    {
      id: 1,
      name: 'Panadería y Pastelería',
      slug: 'panaderia-y-pasteleria',
    },
    {
      id: 2,
      name: 'Carnicería',
      slug: 'carniceria',
    },
    {
      id: 3,
      name: 'Panadería',
      slug: 'panaderia',
    },
    {
      id: 4,
      name: 'Refrigeración',
      slug: 'refrigeracion',
    },
    {
      id: 5,
      name: 'Restaurant',
      slug: 'acero-inoxidable',
    },
    {
      id: 6,
      name: 'Otros',
      slug: 'Otros',
    },
  ];
}
