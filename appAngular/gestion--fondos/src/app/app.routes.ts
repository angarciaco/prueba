import { Routes } from '@angular/router';
import { FondoListComponent } from './components/fondo-list/fondo-list.component';
import { FondoDetailComponent } from './components/fondo-detail/fondo-detail.component';
import { FondoFormComponent } from './components/fondo-form/fondo-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'fondos', component: FondoListComponent },
  { path: 'fondos/nuevo', component: FondoFormComponent },
  { path: 'fondos/:id', component: FondoDetailComponent },
  { path: '', redirectTo: '/fondos', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
