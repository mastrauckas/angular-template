import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import HelloWorldComponent from './helloWorld/helloWorld.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
