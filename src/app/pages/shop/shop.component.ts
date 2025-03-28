import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  
  products: Product[] = [
    { name: 'Abstract Painting', description: 'A colorful abstract painting.', price: 120 },
    { name: 'Landscape Art', description: 'A beautiful landscape scene.', price: 95 },
    { name: 'Portrait Sketch', description: 'A detailed portrait sketch.', price: 75 },
    { name: 'Modern Sculpture', description: 'A contemporary modern sculpture.', price: 150 }
  ];

  clickedProducts: string[] = [];

  addToCart(product: Product): void {
    if (this.clickedProducts.includes(product.name)) {
      const index = this.clickedProducts.indexOf(product.name);
      if (index > -1) {
        this.clickedProducts.splice(index, 1);
      }
    } else {
      this.clickedProducts.push(product.name);
    }

    console.log(`Added to cart: ${product.name}`);
    console.log('Clicked products:', this.clickedProducts);
  }
}
