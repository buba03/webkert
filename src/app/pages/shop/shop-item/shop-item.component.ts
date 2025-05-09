import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProductTypePipe } from '../../../shared/pipes/product-type.pipe';
import { PricePipe } from '../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatCardModule, ProductTypePipe, PricePipe],
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