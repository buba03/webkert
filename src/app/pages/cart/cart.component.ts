import { Component } from '@angular/core';
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

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-cart',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, MatCardModule, MatRadioModule, MatIcon],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
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
    private router: Router
  ) {}

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
