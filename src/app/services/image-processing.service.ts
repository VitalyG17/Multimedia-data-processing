import {EventEmitter, inject, Injectable, Output} from '@angular/core';
import {ImageNegativeService} from './image-negative.service';
import {PowerLawTransformationService} from './power-law-transformation.service';
import {MedianService} from './median.service';
import {LaplacianService} from './laplacian.service';
import {BrightnessRangeCutoffService} from './brightness-range-cutoff.service';
import {ThresholdService} from './threshold.service';
import {LinearService} from './linear.service';
import {DilateService} from './dilate.service';
import {ErosionService} from './erosion.service';
import {ClosureService} from './closure.service';
import {OpeningService} from './opening.service';
import {GradientsService} from './gradients.service';
import {HighlightingBordersService} from './highlighting-borders.service';
import {SkeletonService} from './skeleton.service';
import {OtsuService} from './otsu.service';
import {HistogramEqualizationService} from './histogram-equalization.service';

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

  private readonly closureService: ClosureService = inject(ClosureService);

  private readonly openingService: OpeningService = inject(OpeningService);

  private readonly gradientsService: GradientsService = inject(GradientsService);

  private readonly highlightingBordersService: HighlightingBordersService = inject(HighlightingBordersService);

  private readonly skeletonService: SkeletonService = inject(SkeletonService);

  private readonly otsuService: OtsuService = inject(OtsuService);

  private readonly histogramEqualizationService: HistogramEqualizationService = inject(HistogramEqualizationService);

  @Output() public imageDataUpdated: EventEmitter<ImageData> = new EventEmitter<ImageData>();

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
        case 'Замыкание': {
          const filteredClosingData: ImageData = this.closureService.applyClosing(imageData);
          context.putImageData(filteredClosingData, 0, 0);
          break;
        }
        case 'Размыкание': {
          const filteredOpeningData: ImageData = this.openingService.applyOpening(imageData);
          context.putImageData(filteredOpeningData, 0, 0);
          break;
        }
        case 'Робертса': {
          const filteredRobertsData: ImageData = this.gradientsService.applyRobertsGradient(imageData);
          context.putImageData(filteredRobertsData, 0, 0);
          break;
        }
        case 'Собеля': {
          const filteredSobelData: ImageData = this.gradientsService.applySobelGradient(imageData);
          context.putImageData(filteredSobelData, 0, 0);
          break;
        }
        case 'Выделение границ': {
          const filteredHighlightingBordersData: ImageData =
            this.highlightingBordersService.applyEdgeDetection(imageData);
          context.putImageData(filteredHighlightingBordersData, 0, 0);
          break;
        }
        case 'Остов': {
          const filteredSkeletonData: ImageData = this.skeletonService.applySkeleton(imageData);
          context.putImageData(filteredSkeletonData, 0, 0);
          break;
        }
        case 'Метод Оцу': {
          const filteredOtsuData: ImageData = this.otsuService.applyOtsuThreshold(imageData);
          context.putImageData(filteredOtsuData, 0, 0);
          break;
        }
        case 'Гистограмма': {
          this.imageDataUpdated.emit(imageData);
          break;
        }
        case 'Эквализация гистограммы': {
          const filteredHistogramData: ImageData =
            this.histogramEqualizationService.applyHistogramEqualization(imageData);
          context.putImageData(filteredHistogramData, 0, 0);
          break;
        }
      }
      return canvas.toDataURL();
    }
    return '';
  }
}
