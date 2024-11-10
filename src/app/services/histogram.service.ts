import {Injectable} from '@angular/core';

@Injectable()
export class HistogramService {
  public calculateHistogram(imageData: ImageData): {red: number[]; green: number[]; blue: number[]} {
    const redHistogram: number[] = new Array(256).fill(0);
    const greenHistogram: number[] = new Array(256).fill(0);
    const blueHistogram: number[] = new Array(256).fill(0);

    const data: Uint8ClampedArray = imageData.data;

    for (let i: number = 0; i < data.length; i += 4) {
      const redValue: number = data[i];
      const greenValue: number = data[i + 1];
      const blueValue: number = data[i + 2];

      redHistogram[redValue]++;
      greenHistogram[greenValue]++;
      blueHistogram[blueValue]++;
    }

    return {red: redHistogram, green: greenHistogram, blue: blueHistogram};
  }
}
