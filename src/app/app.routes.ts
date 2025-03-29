import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'shop',
        loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent),
    },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];