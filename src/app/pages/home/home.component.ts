import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';
import { HomeItemComponent } from './home-item/home-item.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, HomeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getTopFiveAlphabetical().subscribe(products => {
      this.products = products;
    });
  }
}
