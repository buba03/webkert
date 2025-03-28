import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shop.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() inCart = new EventEmitter<Product>();

  toggleInCart(): void {
    this.inCart.emit(this.product);
  }
}