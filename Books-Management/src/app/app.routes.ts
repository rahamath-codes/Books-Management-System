import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.Register)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: 'books',
    loadComponent: () => import('./booklist/booklist').then(m => m.Booklist),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: 'addbook',
    loadComponent: () => import('./addbook/addbook').then(m => m.Addbook),
    canActivate: [AuthGuard],
    data: { roles: ['LIBRARIAN'] }
  },
  {
    path: 'users',
    loadComponent: () => import('./userlist/userlist').then(m => m.Userlist),
    canActivate: [AuthGuard],
    data: { roles: ['LIBRARIAN'] }
  },
  {
    path: 'managebook',
    loadComponent: () => import('./managebooks/managebooks').then(m => m.Managebooks),
    canActivate: [AuthGuard],
    data: { roles: ['LIBRARIAN'] }
  },
  {
    path: 'borrowbook',
    loadComponent: () => import('./borrowedbooks/borrowedbooks').then(m => m.Borrowedbooks),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: 'borrowedbooklist',
    loadComponent: () => import('./borrowedbooklist/borrowedbooklist').then(m => m.Borrowedbooklist),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: 'favbooks',
    loadComponent: () => import('./favoritebooks/favoritebooks').then(m => m.Favoritebooks),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: 'search',
    loadComponent: () => import('./searchlist/searchlist').then(m => m.Searchlist),
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'LIBRARIAN'] }
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found').then(m => m.PageNotFound)
  }
];
