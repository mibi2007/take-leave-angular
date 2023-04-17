import { Route } from '@angular/router';
import { DuyetNghiPhepComponent } from './duyet-nghi-phep/duyet-nghi-phep.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'duyet-nghi-phep/:id',
    component: DuyetNghiPhepComponent,
  }
];
