import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './shop-item/shop-item.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductTypePipe } from './shop-item/product-type.pipe';

export interface Product {
  id: number
  name: string;
  type: "painting" | "whittling" | "drawing" | "misc";
  description: string;
  price: number;
  isInCart: boolean
  image: string;
}

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, ProductComponent, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ProductTypePipe],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  @Input() title: string = 'Art Shop';
  @Output() productAdded = new EventEmitter<Product>();

  types: string[] = ['painting', 'whittling', 'drawing', 'misc']
  // imagePreview: string | null = null;
  // selectedFile: File | null = null;

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

  newProduct: Product = {
    id: this.getNextId(),
    name: '',
    type:
    this.types[0] as "painting" | "whittling" | "drawing" | "misc",
    description: '',
    price: 0,
    isInCart: false,
    image: ''
  };

  constructor(private snackBar: MatSnackBar) {}

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.type && this.newProduct.price > 0) {
      this.products.push({ ...this.newProduct });
      this.productAdded.emit(this.newProduct);
      console.log('New product added with id: ' + this.newProduct.id);

      this.newProduct = { id: this.getNextId(), name: '', type: 'painting', description: '', price: 0, isInCart: false, image: '' };
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
/*
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      // Save image for new product
      this.newProduct.image = this.selectedFile.name;

      // Preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }*/
}
