import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sumOfProductValues',
  standalone: true
})
export class SumOfProductValuesPipe implements PipeTransform {

  transform(products: Array<{ price: number, quantity: number }> | any): number {
    //suma cen produktów zaokrąglona do 2 miejsc po przecinku
    return Number(products?.reduce((acc: number, product: { price: number; quantity: number; }) => acc + product.price * product.quantity, 0).toFixed(2)) || 0;
  return 0;
  }

}
