import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app/app.routing';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(AppRouting))
  ]
})
  .catch((err) => console.error(err));
