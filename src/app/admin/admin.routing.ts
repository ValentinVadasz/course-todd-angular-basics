import {Routes} from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: 'donuts', loadComponent:
      () => import('./containers/donut-list/donut-list.component')
        .then(x => x.DonutListComponent)
  },
  {
    path: 'donuts/new', loadComponent:
      () => import('./containers/donut-single/donut-single.component')
        .then(x => x.DonutSingleComponent), data: {isEdit: false}
  },
  {
    path: 'donuts/:id', loadComponent:
      () => import('./containers/donut-single/donut-single.component')
        .then(x => x.DonutSingleComponent), data: {isEdit: true}
  },
  {path: '', redirectTo: 'donuts', pathMatch: 'full'}
];
