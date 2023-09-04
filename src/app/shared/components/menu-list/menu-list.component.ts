import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Category } from '@layout/layout-shop/models';
import Fuse from 'fuse.js';

export interface FilteredObject {
  item: Category;
  refIndex?: number;
  score?: number;
}

@Component({
  selector: 'app-menu-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent {
  @Output() elementClickedEvent = new EventEmitter<string>();

  products: Category[] = [
    {
      id: 1,
      name: 'Amasadora',
      slug: 'amasadora',
    },
    {
      id: 2,
      name: 'batidora',
      slug: 'batidora',
    },
    {
      id: 3,
      name: 'depositos de acerpo',
      slug: 'depositos-de-acerpo',
    },
    {
      id: 4,
      name: 'refrigeracion',
      slug: 'refrigeracion',
    },
    {
      id: 5,
      name: 'cortadora de fieambre',
      slug: 'cortadora-de-fieambre',
    },
    {
      id: 6,
      name: 'Máquiona de churros',
      slug: 'maquina-de-churros',
    },
    {
      id: 7,
      name: 'Revolvedora de masas',
      slug: 'revolvedora-de-masas',
    },
    {
      id: 8,
      name: 'Picadora de papas, cebollas y tomates',
      slug: 'picadora-de-papas-cebollas-y-tomates',
    },
    {
      id: 9,
      name: 'Motores Eléctricos',
      slug: 'motores-electricos',
    },
    {
      id: 10,
      name: 'Canastillos para freidoras',
      slug: 'canastillos-para-freidoras',
    },
    {
      id: 11,
      name: 'Balanzas',
      slug: 'balanzas',
    },
    {
      id: 12,
      name: 'Asadoras de Pollos',
      slug: 'asadoras-de-pollos',
    },
    {
      id: 12,
      name: 'Hornos, Loncheras y Bandejas',
      slug: 'hornos-loncheras-y-bandejas',
    },
    {
      id: 13,
      name: 'Cocinas, Fogones y Anafes',
      slug: 'cocinas-fogones-y-anafes',
    },
    {
      id: 14,
      name: 'Accesorios',
      slug: 'accesorios',
    },
    {
      id: 15,
      name: 'Baños María a gas y eléctrico',
      slug: 'baños-maria-a-gas-y-electrico',
    },
    {
      id: 16,
      name: 'Campanas, Extractores de aire',
      slug: 'campanas-extractores-de-aire',
    },
    {
      id: 17,
      name: 'Depósitos de acero',
      slug: 'depositos-de-acero',
    },
    {
      id: 18,
      name: 'Freidoras Gas y Eléctricas',
      slug: 'freidoras-gas-y-electricas',
    },
    {
      id: 19,
      name: 'Herramientas',
      slug: 'herramientas',
    },
    {
      id: 20,
      name: 'Lava-manos, Lava-fondos',
      slug: 'lava-manos-lava-fondos',
    },
    {
      id: 21,
      name: 'Mesones de Trabajo',
      slug: 'mesones-de-trabajo',
    },
    {
      id: 22,
      name: 'Ollas, Sartenes, Pailas',
      slug: 'ollas-sartenes-pailas',
    },
    {
      id: 23,
      name: 'Sobadoras de masas',
      slug: 'sobadoras-de-masas',
    },
    {
      id: 24,
      name: 'Termómetros calor y frío',
      slug: 'termometros-calor-y-frio',
    },
  ];

  productsFiltered: FilteredObject[] = [];
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
    this.productsFiltered = this.products.map((product) => {
      return {
        item: {
          id: product.id,
          name: product.name,
          slug: product.slug,
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
  emitelementClickedEvent(slug: string) {
    this.elementClickedEvent.emit(slug);
  }
}
