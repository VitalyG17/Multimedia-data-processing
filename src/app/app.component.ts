import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public selectedImageData: ImageData | null = null;
  public showHistogram: boolean = false;

  public onImageDataLoaded(imageData: ImageData): void {
    this.selectedImageData = imageData;
    this.showHistogram = true;
  }

  protected clearHistogram(): void {
    this.selectedImageData = null;
    this.showHistogram = false;
  }
}
