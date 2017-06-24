import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environmentName } from './globals';

if (environmentName === 'PRODUCTION') {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule);
