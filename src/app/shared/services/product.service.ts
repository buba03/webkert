import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  CollectionReference,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Query,
} from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { from, Observable } from 'rxjs';
import { setDoc } from '@angular/fire/firestore';
import { User } from '../models/User';

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

  // Queries
  getExpensiveProducts(minPrice: number): Observable<Product[]> {
    const q = query(
      this.productsRef,
      where('price', '>', minPrice),
      orderBy('price', 'desc')
    );
    return from(getDocs(q).then(snapshot => snapshot.docs.map(doc => doc.data() as Product)));
  }
  getProductsByTypeAscPrice(type: string): Observable<Product[]> {
    const q = query(
      this.productsRef,
      where('type', '==', type),
      orderBy('price', 'asc')
    );
    return from(getDocs(q).then(snapshot => snapshot.docs.map(doc => doc.data() as Product)));
  }
  getTopFiveAlphabetical(): Observable<Product[]> {
    const q = query(
      this.productsRef,
      orderBy('name', 'asc'),
      limit(5)
    );
    return from(getDocs(q).then(snapshot => snapshot.docs.map(doc => doc.data() as Product)));
  }
  getProductsNotInCart(userData: { products_in_cart: { id: number }[] }): Observable<Product[]> {
    const productIdsInCart = userData.products_in_cart.map(p => p.id);

    return from(
      getDocs(this.productsRef).then(snapshot => {
        return snapshot.docs
          .map(doc => doc.data() as Product)
          .filter(product => !productIdsInCart.includes(product.id));
      })
    );
  }
        
}
