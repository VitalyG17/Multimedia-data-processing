import {Injectable} from '@angular/core';
import {HistogramService} from './histogram.service';

@Injectable()
export class HistogramEqualizationService {
  private histogramService: HistogramService;

  constructor() {
    this.histogramService = new HistogramService();
  }

  public applyHistogramEqualization(imageData: ImageData): ImageData {
    const {red, green, blue} = this.histogramService.calculateHistogram(imageData);

    const redCumulative: number[] = this.cumulativeHistogram(red);
    const greenCumulative: number[] = this.cumulativeHistogram(green);
    const blueCumulative: number[] = this.cumulativeHistogram(blue);

    const redNormalized: number[] = this.normalizeHistogram(redCumulative, imageData.data.length / 4);
    const greenNormalized: number[] = this.normalizeHistogram(greenCumulative, imageData.data.length / 4);
    const blueNormalized: number[] = this.normalizeHistogram(blueCumulative, imageData.data.length / 4);

    const result: ImageData = new ImageData(imageData.width, imageData.height);
    const data: Uint8ClampedArray = imageData.data;
    const resultData: Uint8ClampedArray = result.data;

    for (let i: number = 0; i < data.length; i += 4) {
      resultData[i] = redNormalized[data[i]];
      resultData[i + 1] = greenNormalized[data[i + 1]];
      resultData[i + 2] = blueNormalized[data[i + 2]];
      resultData[i + 3] = data[i + 3];
    }

    return result;
  }

  private cumulativeHistogram(histogram: number[]): number[] {
    const cumulative = new Array(256).fill(0);
    cumulative[0] = histogram[0];

    for (let i: number = 1; i < 256; i++) {
      cumulative[i] = cumulative[i - 1] + histogram[i];
    }

    return cumulative;
  }

  private normalizeHistogram(cumulativeHistogram: number[], totalPixels: number): number[] {
    const normalized = new Array(256);

    const minValue: number = cumulativeHistogram[0];
    const maxValue: number = cumulativeHistogram[255];

    for (let i: number = 0; i < 256; i++) {
      normalized[i] = Math.round(((cumulativeHistogram[i] - minValue) / (maxValue - minValue)) * 255);
    }

    return normalized;
  }
}
