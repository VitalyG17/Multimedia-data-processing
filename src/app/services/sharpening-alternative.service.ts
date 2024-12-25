import {inject, Injectable} from '@angular/core';
import {HistogramEqualizationService} from './histogram-equalization.service';
import {MedianService} from './median.service';
import {HighlightingBordersService} from './highlighting-borders.service';

@Injectable()
export class SharpeningAlternativeService {
  private readonly medianFilterService: MedianService = inject(MedianService);
  private readonly histogramEqualizationService: HistogramEqualizationService = inject(HistogramEqualizationService);
  private readonly highlightingBordersService: HighlightingBordersService = inject(HighlightingBordersService);

  public applySharpening(imageData: ImageData): ImageData {
    const equalizedData: ImageData = this.histogramEqualizationService.applyHistogramEqualization(imageData);
    const denoisedData: ImageData = this.medianFilterService.applyMedianFilter(equalizedData);
    const edgeData: ImageData = this.highlightingBordersService.applyEdgeDetection(denoisedData);
    const result: Uint8ClampedArray = new Uint8ClampedArray(imageData.data.length);
    for (let i: number = 0; i < imageData.data.length; i += 4) {
      result[i] = this.clamp(imageData.data[i] + edgeData.data[i], 0, 255);
      result[i + 1] = this.clamp(imageData.data[i + 1] + edgeData.data[i + 1], 0, 255);
      result[i + 2] = this.clamp(imageData.data[i + 2] + edgeData.data[i + 2], 0, 255);
      result[i + 3] = imageData.data[i + 3];
    }

    const sharpenedImage: ImageData = new ImageData(imageData.width, imageData.height);
    sharpenedImage.data.set(result);
    return sharpenedImage;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
