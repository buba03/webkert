import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  CollectionReference,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { from, Observable } from 'rxjs';
import { setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsRef: CollectionReference;

  constructor(private firestore: Firestore) {
    this.productsRef = collection(this.firestore, 'Products');
  }

  getAllProducts(): Observable<Product[]> {
    return from(
      getDocs(this.productsRef).then(snapshot =>
        snapshot.docs.map(doc => doc.data() as Product)
      )
    );
  }



  addProduct(product: Product): Observable<void> {
    const productQuery = getDocs(this.productsRef).then(snapshot => {
      const existing = snapshot.docs.find(doc => (doc.data() as Product).id === product.id);
      if (existing) {
        throw new Error(`Product with id ${product.id} already exists.`);
      } else {
        const productDoc = doc(this.firestore, 'Products', product.id.toString());
        return setDoc(productDoc, product).then(() => {});
      }
    });
  
    return from(productQuery);
  }
  

  updateProduct(productId: string, updatedData: Partial<Product>): Observable<void> {
    const productDoc = doc(this.firestore, 'Products', productId);
    return from(updateDoc(productDoc, updatedData));
  }

  deleteProduct(productId: number): Observable<void> {
    // TODO: remove from cart as well
    const productDoc = doc(this.firestore, 'Products', productId.toString());
    return from(deleteDoc(productDoc));
  }
}
