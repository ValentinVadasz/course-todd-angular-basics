import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';

import {DonutService} from './admin/services/donut.service';
import {Routes} from '@angular/router';

export const AppRouting: Routes = [
  {
    path: 'admin',
    loadChildren:
      () => import('./admin/admin.routing').then(x => x.AdminRoutes),
    providers: [
      importProvidersFrom(HttpClientModule),
      DonutService
    ]
  },
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: '**', redirectTo: 'admin'}
];
