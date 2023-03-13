import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlaceholderDirective]
})
export class AppModule { }
