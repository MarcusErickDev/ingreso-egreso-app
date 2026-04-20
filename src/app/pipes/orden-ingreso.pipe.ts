import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    if (!items) {
      return [];
    }

    return [...items].sort((a, b) => {
      if (a.tipo === b.tipo) {
        return 0;
      }

      return a.tipo === 'ingreso' ? -1 : 1;
    });
  }

}
