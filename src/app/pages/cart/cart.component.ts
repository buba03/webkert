import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartItemComponent } from '../cart/cart-item/cart-item.component';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Product } from '../../shared/models/Product';
import { ShippingData } from '../../shared/models/ShippingData';

@Component({
  selector: 'app-cart',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, MatCardModule, MatRadioModule, MatIcon, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  user: User | null = null;
  products_in_cart: Product[] = [];

  shippingData: ShippingData = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    phoneNumber: '',
    paymentMethod: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {}

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.products_in_cart = data.products_in_cart;

        if (this.user) {
          this.shippingData.firstName = this.user?.name.firstname;
          this.shippingData.lastName = this.user?.name.lastname;
          this.shippingData.email = this.user?.email;
        }

      },
      error: (error) => {
        console.error('An errror occured while loading the profile: ', error);
      }
    });
  }

  submitForm() {
    if (
      !this.shippingData.firstName ||
      !this.shippingData.lastName ||
      !this.shippingData.email ||
      !this.shippingData.phoneNumber ||
      !this.shippingData.country ||
      !this.shippingData.address ||
      !this.shippingData.paymentMethod
    ) {
      this.snackBar.open('Invalid input values!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      console.error("Form validation failed:", this.shippingData);
      return;
    }

    this.snackBar.open('Order placed successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
    console.log("Form submitted successfully:", this.shippingData);
    this.router.navigate(['/home']);
  }
}
