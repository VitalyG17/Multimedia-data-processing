import {inject, Injectable} from '@angular/core';
import {ImageNegativeService} from './image-negative.service';
import {PowerLawTransformationService} from './power-law-transformation.service';
import {MedianService} from './median.service';
import {LaplacianService} from './laplacian.service';
import {BrightnessRangeCutoffService} from './brightness-range-cutoff.service';

@Injectable()
export class ImageProcessingService {
  private readonly imageNegativeService: ImageNegativeService = inject(ImageNegativeService);

  private readonly powerLawTransformationService: PowerLawTransformationService = inject(PowerLawTransformationService);

  private readonly medianService: MedianService = inject(MedianService);

  private readonly laplacianService: LaplacianService = inject(LaplacianService);

  private readonly brightnessRangeCutoff: BrightnessRangeCutoffService = inject(BrightnessRangeCutoffService);

  public applyFilter(
    canvas: HTMLCanvasElement,
    filter: string,
    coefficient: number,
    gamma: number,
    minBrightness: number,
    maxBrightness: number,
  ): string {
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
        case 'Медианный фильтр':
          const filteredMedianData: ImageData = this.medianService.applyMedianFilter(imageData);
          context.putImageData(filteredMedianData, 0, 0);
          break;
        case 'Лапласиан':
          const filteredLaplacianService: ImageData = this.laplacianService.applyLaplacianFilter(imageData);
          context.putImageData(filteredLaplacianService, 0, 0);
          break;
        case 'Вырезание диапазона яркостей':
          const brightnessRangeCutoff: ImageData = this.brightnessRangeCutoff.applyBrightnessRangeCutoff(
            imageData,
            minBrightness,
            maxBrightness,
          );
          context.putImageData(brightnessRangeCutoff, 0, 0);
          break;
      }
      return canvas.toDataURL();
    }
    return '';
  }
}
