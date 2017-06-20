import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './globals';

console.log(environment);
if (environment === 'PRODUCTION') {
    enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule);
