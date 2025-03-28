import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTypeFormatter'
})
export class ProductTypePipe implements PipeTransform {

  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);;
  }

}
