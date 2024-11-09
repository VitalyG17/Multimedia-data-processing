import {inject, Injectable} from '@angular/core';
import {ImageNegativeService} from './image-negative.service';
import {PowerLawTransformationService} from './power-law-transformation.service';
import {MedianService} from './median.service';
import {LaplacianService} from './laplacian.service';
import {BrightnessRangeCutoffService} from './brightness-range-cutoff.service';
import {ThresholdService} from './threshold.service';
import {LinearService} from './linear.service';
import {DilateService} from './dilate.service';
import {ErosionService} from './erosion.service';

@Injectable()
export class ImageProcessingService {
  private readonly imageNegativeService: ImageNegativeService = inject(ImageNegativeService);

  private readonly powerLawTransformationService: PowerLawTransformationService = inject(PowerLawTransformationService);

  private readonly medianService: MedianService = inject(MedianService);

  private readonly laplacianService: LaplacianService = inject(LaplacianService);

  private readonly brightnessRangeCutoff: BrightnessRangeCutoffService = inject(BrightnessRangeCutoffService);

  private readonly thresholdService: ThresholdService = inject(ThresholdService);

  private readonly linearService: LinearService = inject(LinearService);

  private readonly dilateService: DilateService = inject(DilateService);

  private readonly erosionService: ErosionService = inject(ErosionService);

  public applyFilter(
    canvas: HTMLCanvasElement,
    filter: string,
    coefficient: number,
    gamma: number,
    minBrightness: number,
    maxBrightness: number,
    threshold: number,
    gain: number,
    bias: number,
  ): string {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);

      switch (filter) {
        case 'Негатив': {
          const filteredImageData: ImageData = this.imageNegativeService.applyNegativeFilter(imageData);
          context.putImageData(filteredImageData, 0, 0);
          break;
        }
        case 'Степенное преобразование': {
          const filteredGammaData: ImageData = this.powerLawTransformationService.applyPowerLawTransformation(
            imageData,
            gamma,
            coefficient,
          );
          context.putImageData(filteredGammaData, 0, 0);
          break;
        }
        case 'Медианный фильтр': {
          const filteredMedianData: ImageData = this.medianService.applyMedianFilter(imageData);
          context.putImageData(filteredMedianData, 0, 0);
          break;
        }
        case 'Лапласиан': {
          const filteredLaplacianService: ImageData = this.laplacianService.applyLaplacianFilter(imageData);
          context.putImageData(filteredLaplacianService, 0, 0);
          break;
        }
        case 'Вырезание диапазона яркостей': {
          const brightnessRangeCutoff: ImageData = this.brightnessRangeCutoff.applyBrightnessRangeCutoff(
            imageData,
            minBrightness,
            maxBrightness,
          );
          context.putImageData(brightnessRangeCutoff, 0, 0);
          break;
        }
        case 'Пороговый фильтр': {
          const filteredThresholdData: ImageData = this.thresholdService.applyThresholdFilter(imageData, threshold);
          context.putImageData(filteredThresholdData, 0, 0);
          break;
        }
        case 'Линейный фильтр': {
          const filteredLinearData: ImageData = this.linearService.applyLinearFilter(imageData, gain, bias);
          context.putImageData(filteredLinearData, 0, 0);
          break;
        }
        case 'Дилатация': {
          const filteredDilationData: ImageData = this.dilateService.applyDilation(imageData);
          context.putImageData(filteredDilationData, 0, 0);
          break;
        }
        case 'Эрозия': {
          const filteredErosionData: ImageData = this.erosionService.applyErosion(imageData);
          context.putImageData(filteredErosionData, 0, 0);
          break;
        }
      }
      return canvas.toDataURL();
    }
    return '';
  }
}
