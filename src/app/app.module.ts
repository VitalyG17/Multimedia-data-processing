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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PowerLawTransformationService} from './services/power-law-transformation.service';
import {MedianService} from './services/median.service';
import {LaplacianService} from './services/laplacian.service';
import {BrightnessRangeCutoffService} from './services/brightness-range-cutoff.service';
import {ThresholdService} from './services/threshold.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PhotoSelectionComponent, MenuComponent, DialogComponent],
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
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    ImageNegativeService,
    FilterService,
    ImageProcessingService,
    PowerLawTransformationService,
    MedianService,
    LaplacianService,
    BrightnessRangeCutoffService,
    ThresholdService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
