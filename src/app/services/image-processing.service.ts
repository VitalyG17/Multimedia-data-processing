import {inject, Injectable} from '@angular/core';
import {ImageNegativeService} from './image-negative.service';
import {PowerLawTransformationService} from './power-law-transformation.service';

@Injectable()
export class ImageProcessingService {
  private readonly imageNegativeService: ImageNegativeService = inject(ImageNegativeService);

  private readonly powerLawTransformationService: PowerLawTransformationService = inject(PowerLawTransformationService);
  public applyFilter(canvas: HTMLCanvasElement, filter: string, coefficient: number, gamma: number): string {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);

      switch (filter) {
        case 'Негатив':
          const filteredImageData: ImageData = this.imageNegativeService.applyNegativeFilter(imageData);
          context.putImageData(filteredImageData, 0, 0);
          break;
        case 'Степенное преобразование':
          const filteredGammaData: ImageData = this.powerLawTransformationService.applyPowerLawTransformation(
            imageData,
            gamma,
            coefficient,
          );
          context.putImageData(filteredGammaData, 0, 0);
          break;
      }
      return canvas.toDataURL();
    }
    return '';
  }
}
