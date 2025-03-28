import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './shop-item/shop-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Product {
  id: number
  name: string;
  description: string;
  price: number;
  isInCart: boolean
}

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, ProductComponent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  @Input() title: string = 'Art Shop';
  @Output() productAdded = new EventEmitter<Product>();
  
  products: Product[] = [
    { id: 1, name: 'Abstract Painting', description: 'A colorful abstract painting.', price: 120, isInCart: false },
    { id: 2, name: 'Landscape Art', description: 'A beautiful landscape scene. A beautiful landscape scene. A beautiful landscape scene. A beautiful landscape scene. A beautiful landscape scene.', price: 95, isInCart: false },
    { id: 3, name: 'Portrait Sketch', description: 'A detailed portrait sketch.', price: 75, isInCart: false },
    { id: 4, name: 'Modern Sculpture', description: 'A contemporary modern sculpture.', price: 15, isInCart: false },
  ];

  newProduct: Product = { id: this.getNextId(), name: '', description: '', price: 0, isInCart: false };

  constructor(private snackBar: MatSnackBar) {}

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price > 0) {
      this.products.push({ ...this.newProduct });
      this.productAdded.emit(this.newProduct);
      console.log('New product added with id: ' + this.newProduct.id);

      this.newProduct = { id: this.getNextId(), name: '', description: '', price: 0, isInCart: false };
    } else {
      this.showSnackbar('Invalid input values!');
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  addToCart(product: Product): void {
    product.isInCart = !product.isInCart;
    console.log(product.isInCart ? `Added to cart: ${product.name}` : `Removed from cart: ${product.name}`);
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }

  getNextId(): number {
    if (this.products.length === 0) {
      return 1;
    }
    const sortedIds = this.products.map(product => product.id).sort((a, b) => a - b);
    return sortedIds[sortedIds.length - 1] + 1;
  }
}
