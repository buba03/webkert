import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PricePipe } from '../../../shared/pipes/price.pipe';
import { ProductTypePipe } from '../../../shared/pipes/product-type.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, PricePipe, ProductTypePipe, RouterLink],
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss']
})
export class HomeItemComponent {
  @Input() product!: Product;
}