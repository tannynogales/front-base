import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (value === undefined) {
      return value;
    }
    return value.toLocaleString('es-ES');
  }
}
