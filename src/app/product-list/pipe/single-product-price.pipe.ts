import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'singleProductPrice',
  standalone: true
})
export class SingleProductPricePipe implements PipeTransform {

  transform(price: number, quantity: number): number {
    return Number((price * quantity).toFixed(2));
  }
}
