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
      { id: 1, name: "Sunset Serenity", type: "painting", description: "A vibrant sunset over a calm ocean, capturing the beauty of nature.", price: 120, isInCart: false, image: "sunset-serenity.jpeg" },
      { id: 2, name: "Forest Pathway", type: "painting", description: "An inviting forest trail bathed in golden autumn hues.", price: 150, isInCart: false, image: "forest-pathway.jpeg" },
      { id: 3, name: "Abstract Chaos", type: "painting", description: "A bold mix of colors and shapes that evoke raw emotion.", price: 180, isInCart: false, image: "abstract-chaos.jpeg" },
      { id: 4, name: "Whittled Owl", type: "whittling", description: "A finely detailed wooden owl, handcrafted from oak.", price: 75, isInCart: false, image: "whittled-owl.jpeg" },
      { id: 5, name: "Rustic Wooden Fox", type: "whittling", description: "A charming fox figurine whittled from reclaimed wood.", price: 90, isInCart: false, image: "rustic-wooden-fox.jpeg" },
      { id: 6, name: "Mountain Majesty", type: "painting", description: "A breathtaking landscape of towering mountains and misty valleys.", price: 130, isInCart: false, image: "mountain-majesty.jpeg" },
      { id: 7, name: "Charcoal Portrait", type: "drawing", description: "A realistic charcoal portrait bringing deep emotions to life.", price: 95, isInCart: false, image: "charcoal-portrait.jpeg" },
      { id: 8, name: "Ink Sketch: Cityscape", type: "drawing", description: "A highly detailed ink sketch capturing the energy of an urban skyline.", price: 85, isInCart: false, image: "ink-sketch-cityscape.jpeg" },
      { id: 9, name: "Handmade Wooden Spoon", type: "whittling", description: "A beautifully carved wooden spoon with a rustic charm.", price: 30, isInCart: false, image: "handmade-wooden-spoon.jpeg" },
      { id: 10, name: "Whittled Bear Figurine", type: "whittling", description: "A small yet detailed bear figurine, handcrafted from maple wood.", price: 65, isInCart: false, image: "whittled-bear-figurine.jpeg" },
      { id: 11, name: "Golden Horizon", type: "painting", description: "A minimalist golden horizon against a deep blue sky.", price: 140, isInCart: false, image: "golden-horizon.jpeg" },
      { id: 12, name: "Sketchbook Doodles", type: "drawing", description: "A collection of expressive doodles sketched in ink.", price: 50, isInCart: false, image: "sketchbook-doodles.jpeg" },
      { id: 13, name: "Wooden Wolf Head", type: "whittling", description: "A lifelike wooden carving of a wolf’s head, full of detail.", price: 110, isInCart: false, image: "wooden-wolf-head.jpeg" },
      { id: 14, name: "Colorful Chaos", type: "painting", description: "An explosion of colors creating a mesmerizing abstract pattern.", price: 200, isInCart: false, image: "colorful-chaos.jpeg" },
      { id: 15, name: "Pencil Study: Hands", type: "drawing", description: "A realistic pencil study of hands in various poses.", price: 70, isInCart: false, image: "pencil-study-hands.jpeg" },
      { id: 16, name: "Mystic Forest", type: "painting", description: "A dark, misty forest with an eerie glow of moonlight.", price: 160, isInCart: false, image: "mystic-forest.jpeg" },
      { id: 17, name: "Carved Wooden Fish", type: "whittling", description: "A delicately carved fish sculpture, perfect for home decor.", price: 55, isInCart: false, image: "carved-wooden-fish.jpeg" },
      { id: 18, name: "Cosmic Vision", type: "painting", description: "A celestial-inspired abstract piece with deep blues and silvers.", price: 175, isInCart: false, image: "cosmic-vision.jpeg" },
      { id: 19, name: "Handmade Chess Pieces", type: "whittling", description: "A complete set of uniquely crafted wooden chess pieces.", price: 250, isInCart: false, image: "handmade-chess-pieces.jpeg" },
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
