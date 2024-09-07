import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {PhotoSelectionComponent} from './components/photo-selection/photo-selection.component';
import {MenuComponent} from './components/menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ImageNegativeService} from './services/image-negative.service';
import {FilterService} from './services/filter.service';
import {ImageProcessingService} from './services/image-processing.service';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PhotoSelectionComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [ImageNegativeService, FilterService, ImageProcessingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
