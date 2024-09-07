import {inject, Injectable} from '@angular/core';
import {ImageNegativeService} from './image-negative.service';

@Injectable()
export class ImageProcessingService {
  private readonly imageNegativeService: ImageNegativeService = inject(ImageNegativeService);
  public applyFilter(canvas: HTMLCanvasElement, filter: string): string {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);

      switch (filter) {
        case 'Негатив':
          const filteredImageData: ImageData = this.imageNegativeService.applyNegativeFilter(imageData);
          context.putImageData(filteredImageData, 0, 0);
          break;
      }
      return canvas.toDataURL();
    }
    return '';
  }
}
