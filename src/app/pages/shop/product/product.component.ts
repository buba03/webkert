import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;
  @Output() addToCartEvent = new EventEmitter<any>();

  addToCart() {
    this.addToCartEvent.emit(this.product);
  }
}