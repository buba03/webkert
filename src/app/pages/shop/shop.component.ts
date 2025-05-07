import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './shop-item/shop-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductTypePipe } from '../../shared/pipes/product-type.pipe';
import { Product } from '../../shared/models/Product';
import { Auth, authState, User } from '@angular/fire/auth';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/services/user.service';
import { Observable, switchMap, of } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, ProductComponent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ProductTypePipe, MatIcon],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input() isLoggedIn: boolean = false;
  @Input() title: string = 'Art Shop';
  @Output() productAdded = new EventEmitter<Product>();

  types: string[] = ['painting', 'whittling', 'drawing', 'misc']
  products: Product[] = [];

  newProduct: Product = {
    id: 0,
    name: '',
    type:
    this.types[0] as "painting" | "whittling" | "drawing" | "misc",
    description: '',
    price: 0,
    isInCart: false,
    image: ''
  };

  currentUser: Observable<User | null>;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: Auth,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.currentUser = authState(this.auth);
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      if(this.currentUser) {
        
        this.getProductIdsFromCart().subscribe({
          next: (ids) => {
            products.forEach((product) => {
              if (ids.includes(product.id)) {
                product.isInCart = true;
              }
            });
          }
        });
      }
      this.products = products;
      console.log(this.products);
    });
  }

  addProduct(): void {
    if (localStorage.getItem('isLoggedIn') === 'false') {
      this.router.navigateByUrl('/login');
      return;
    }
    if (this.newProduct.name && this.newProduct.description && this.newProduct.type && this.newProduct.price > 0) {
      this.newProduct.id = this.getNextId();
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.showSnackbar('Product created successfully.');
          this.products.push({ ...this.newProduct });
          this.productAdded.emit(this.newProduct);
          console.log('New product added with id: ' + this.newProduct.id);
          this.newProduct = { id: this.getNextId(), name: '', type: 'painting', description: '', price: 0, isInCart: false, image: '' };
        },
        error: (err) => {
          this.showSnackbar(err.message);
        }
      });
    } else {
      this.showSnackbar('Invalid input values!');
      console.log(this.newProduct);
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
    if (localStorage.getItem('isLoggedIn') === 'false') {
      this.router.navigateByUrl('/login');
      return;
    }
    if (product.isInCart) {
      this.userService.removeProductFromCart(product.id).subscribe({
        next: () => {
          console.log(`Removed from cart: ${product.name}`);
          product.isInCart = false;
        },
        error: (err) => {
          this.showSnackbar('Failed to remove from cart: ' + err.message);
        }
      });
    } else {
      this.userService.addProductToCart(product.id).subscribe({
        next: () => {
          console.log(`Added to cart: ${product.name}`);
          product.isInCart = true;
        },
        error: (err) => {
          this.showSnackbar('Failed to add to cart: ' + err.message);
        }
      });
    }
  }

  getProductIdsFromCart(): Observable<number[]> {
    return this.userService.getUserProfile().pipe(
      switchMap(data => {
        const ids = data.products_in_cart.map(p => p.id);
        return of(ids);
      })
    );
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

  // Controls
  activeControl: 'add' | 'delete' | 'filter' | null = 'filter';
  setActiveControl(control: 'add' | 'delete' | 'filter') {
    this.activeControl = this.activeControl === control ? null : control;
  }

  // Delete
  selectedProductId: number | null = null;
  deleteSelectedProduct(): void {
    if (localStorage.getItem('isLoggedIn') === 'false') {
      this.router.navigateByUrl('/login');
      return;
    }
    if (this.selectedProductId === null) {
      this.showSnackbar("Please select a product to delete.");
      return;
    }
    this.productService.deleteProduct(this.selectedProductId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== this.selectedProductId);
        this.selectedProductId = null;
        this.showSnackbar("Product deleted successfully.");
      },
      error: (err) => {
        this.showSnackbar("Failed to delete product: " + err.message);
      }
    });
  }
}
