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
import { ProductComponent } from '../shop/shop-item/shop-item.component';

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  paymentMethod: string;
}
export interface Product {
  id: number;
  name: string;
  type: "painting" | "whittling" | "drawing" | "misc";
  description: string;
  price: number;
  isInCart: boolean
  image: string;
}

@Component({
  selector: 'app-cart',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, MatCardModule, MatRadioModule, MatIcon, ProductComponent],
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

    products: Product[] = [
      { id: 3, name: "Abstract Chaos", type: "painting", description: "A bold mix of colors and shapes that evoke raw emotion.", price: 180, isInCart: false, image: "abstract-chaos.jpeg" },
      { id: 12, name: "Sketchbook Doodles", type: "drawing", description: "A collection of expressive doodles sketched in ink.", price: 50, isInCart: false, image: "sketchbook-doodles.jpeg" },
      { id: 14, name: "Colorful Chaos", type: "painting", description: "An explosion of colors creating a mesmerizing abstract pattern.", price: 200, isInCart: false, image: "colorful-chaos.jpeg" },
      { id: 20, name: "Surreal Face Sketch", type: "drawing", description: "A surreal portrait blending realism with abstract shapes.", price: 90, isInCart: false, image: "surreal-face-sketch.jpeg" }
    ];

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
