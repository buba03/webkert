import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    products_in_cart: Product[]
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            products_in_cart: []
          });
        }

        return from(this.fetchUser(authUser.uid));
      })
    );
  }

  private async fetchUser(userId: string): Promise<{
    user: User | null,
    products_in_cart: Product[]
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      // No user
      if (!userSnapshot.exists()) {
        return {
          user: null,
          products_in_cart: []
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      
      // Empty cart
      if (!user.products_in_cart || user.products_in_cart.length === 0) {
        return {
          user,
          products_in_cart: [],
        };
      }

      // Load cart
      const productsCollection = collection(this.firestore, 'Products');
      const q = query(productsCollection, where('id', 'in', user.products_in_cart));
      const productsSnapshot = await getDocs(q);
      
      const products_in_cart: Product[] = [];
      productsSnapshot.forEach(doc => {
        let currentProduct = { ...doc.data()} as Product;
        currentProduct.isInCart = true;
        products_in_cart.push(currentProduct);
      });

      return {
        user,
        products_in_cart
      };
    } catch (error) {
      console.error('An error occured while loading the data: ', error);
      return {
        user: null,
        products_in_cart: [],
      };
    }
  }

  addProductToCart(productId: number): Observable<void> {
    return this.authService.currentUser.pipe(
      switchMap(async (authUser) => {
        if (!authUser) {
          throw new Error('User not logged in');
        }
  
        const userDocRef = doc(this.firestore, 'Users', authUser.uid);
        await updateDoc(userDocRef, {
          products_in_cart: arrayUnion(productId)
        });
      })
    );
  }

  removeProductFromCart(productId: number): Observable<void> {
    return this.authService.currentUser.pipe(
      switchMap(async (authUser) => {
        if (!authUser) {
          throw new Error('User not logged in');
        }
  
        const userDocRef = doc(this.firestore, 'Users', authUser.uid);
        await updateDoc(userDocRef, {
          products_in_cart: arrayRemove(productId)
        });
      })
    );
  }
}