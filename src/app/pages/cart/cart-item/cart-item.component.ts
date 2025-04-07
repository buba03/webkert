import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProductTypePipe } from '../../../shared/pipes/product-type.pipe';
import { PricePipe } from '../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatCardModule, ProductTypePipe, PricePipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() product!: Product;
  @Output() inCart = new EventEmitter<Product>();

  toggleInCart(): void {
    this.product.isInCart = false;
    this.inCart.emit(this.product);
  }
}
