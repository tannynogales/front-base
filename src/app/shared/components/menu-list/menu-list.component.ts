import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-menu-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent {
  products: Array<any> = [
    {
      id: 1,
      name: 'Amasadora',
    },
    {
      id: 2,
      name: 'batidora',
    },
    {
      id: 3,
      name: 'depositos de acerpo',
    },
    {
      id: 4,
      name: 'refrigeracion',
    },
    {
      id: 5,
      name: 'cortadora de fieambre',
    },
    {
      id: 6,
      name: 'Máquiona de churros',
    },
    {
      id: 7,
      name: 'Revolvedora de masas',
    },
    {
      id: 8,
      name: 'Picadora de papas, cebollas y tomates',
    },
    {
      id: 9,
      name: 'Motores Eléctricos',
    },
    {
      id: 10,
      name: 'Canastillos para freidoras',
    },
    {
      id: 11,
      name: 'Balanzas',
    },
    {
      id: 12,
      name: 'Asadoras de Pollos',
    },
    {
      id: 12,
      name: 'Hornos, Loncheras y Bandejas',
    },
    {
      id: 13,
      name: 'Cocinas, Fogones y Anafes',
    },
    {
      id: 14,
      name: 'Accesorios',
    },
    {
      id: 15,
      name: 'Baños María a gas y eléctrico',
    },
    {
      id: 16,
      name: 'Campanas, Extractores de aire',
    },
    {
      id: 17,
      name: 'Depósitos de acero',
    },
    {
      id: 18,
      name: 'Freidoras Gas y Eléctricas',
    },
    {
      id: 19,
      name: 'Herramientas',
    },
    {
      id: 20,
      name: 'Lava-manos, Lava-fondos',
    },
    {
      id: 21,
      name: 'Mesones de Trabajo',
    },
    {
      id: 22,
      name: 'Ollas, Sartenes, Pailas',
    },
    {
      id: 23,
      name: 'Sobadoras de masas',
    },
    {
      id: 24,
      name: 'Termómetros calor y frío',
    },
  ];

  productsFiltered: Array<any> = [];
  searchValue = '';

  getSearchValue(value: string) {
    if (value == '') this.setProductsFiltered();
    else {
      this.searchValue = value;
      this.productsFiltered = this.filtrar(this.products, this.searchValue);
    }
  }

  constructor() {
    this.setProductsFiltered();
  }

  setProductsFiltered() {
    this.productsFiltered = this.products;
    this.productsFiltered = this.products.map((product) => {
      return {
        item: {
          id: product.id,
          name: product.name,
        },
      };
    });
  }
  filtrar(list: Array<any>, value: string) {
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ['name'],
    };
    const fuse = new Fuse(this.products, options);
    const result = fuse.search(this.searchValue);
    return result;
  }
}
