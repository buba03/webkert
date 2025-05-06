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
    const productQuery = getDocs(
      collection(this.firestore, 'Products')
    ).then(snapshot => {
      const existing = snapshot.docs.find(doc => (doc.data() as Product).id === product.id);
      if (existing) {
        throw new Error(`Product with id ${product.id} already exists.`);
      } else {
        return addDoc(this.productsRef, product).then(() => {});
      }
    });
  
    return from(productQuery);
  }
  

  updateProduct(productId: string, updatedData: Partial<Product>): Observable<void> {
    const productDoc = doc(this.firestore, 'Products', productId);
    return from(updateDoc(productDoc, updatedData));
  }

  deleteProduct(productId: string): Observable<void> {
    const productDoc = doc(this.firestore, 'Products', productId);
    return from(deleteDoc(productDoc));
  }
}
