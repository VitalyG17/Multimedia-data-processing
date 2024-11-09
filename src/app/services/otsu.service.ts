import {Injectable} from '@angular/core';

@Injectable()
export class OtsuService {
  public applyOtsuThreshold(imageData: ImageData): ImageData {
    const {width, height}: {width: number; height: number} = imageData;
    const threshold: number = this.calculateOtsuThreshold(imageData);
    const output: ImageData = new ImageData(width, height);

    for (let i: number = 0; i < imageData.data.length; i += 4) {
      const brightness: number =
        0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
      const value: number = brightness >= threshold ? 255 : 0;
      output.data.set([value, value, value, 255], i);
    }
    return output;
  }

  private calculateOtsuThreshold(imageData: ImageData): number {
    const histogram: number[] = this.calculateHistogram(imageData);
    const total: number = imageData.width * imageData.height;
    const sum: number = histogram.reduce((acc: number, val: number, i: number) => acc + i * val, 0);

    let sumB: number = 0;
    let wB: number = 0;
    let maxVariance: number = 0;
    let threshold: number = 0;

    for (let t: number = 0; t < 256; t++) {
      wB += histogram[t];
      if (!wB) continue;

      const wF: number = total - wB;

      if (!wF) break;
      sumB += t * histogram[t];
      const mB: number = sumB / wB;
      const mF: number = (sum - sumB) / wF;
      const variance: number = wB * wF * (mB - mF) ** 2;

      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = t;
      }
    }
    return threshold;
  }

  private calculateHistogram(imageData: ImageData): number[] {
    const histogram: any[] = new Array(256).fill(0);
    for (let i: number = 0; i < imageData.data.length; i += 4) {
      const brightness: number = Math.round(
        0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2],
      );
      histogram[brightness]++;
    }
    return histogram;
  }
}
