import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product.module';

@Pipe({
  name: 'productsearchfilter',
  standalone: true
})
export class ProductSearchFilterPipe implements PipeTransform {

  transform(product: Product[], searchValue: string, searchBy: string): Product [] {
    if(!product){
      return[];
    }
    if(!searchValue){
      return product;
    }

    switch(searchBy){
      case 'title':
        return product.filter(product => product.title.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      case 'code':
        return product.filter(product => product.code.toString().includes(searchValue));
      default:
        return product.filter(product => product.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
  }

}
