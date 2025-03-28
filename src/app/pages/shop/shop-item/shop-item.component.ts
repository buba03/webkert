import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shop.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProductTypePipe } from './product-type.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatCardModule, ProductTypePipe],
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