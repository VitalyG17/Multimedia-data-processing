import {Injectable} from '@angular/core';

@Injectable()
export class MedianService {
  public applyMedianFilter(imageData: ImageData): ImageData {
    const data: Uint8ClampedArray = imageData.data;
    const width: number = imageData.width;
    const height: number = imageData.height;
    const getPixel = (x: number, y: number, offset: number): number => {
      const index: number = (y * width + x) * 4 + offset;
      return data[index];
    };

    const setPixel = (x: number, y: number, r: number, g: number, b: number, a: number): void => {
      const index: number = (y * width + x) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = a;
    };

    const applyMedian = (x: number, y: number): void => {
      const neighborsR: number[] = [];
      const neighborsG: number[] = [];
      const neighborsB: number[] = [];

      for (let dy: number = -1; dy <= 1; dy++) {
        for (let dx: number = -1; dx <= 1; dx++) {
          const nx: number = x + dx;
          const ny: number = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            neighborsR.push(getPixel(nx, ny, 0));
            neighborsG.push(getPixel(nx, ny, 1));
            neighborsB.push(getPixel(nx, ny, 2));
          }
        }
      }

      const medianR: number = this.getMedian(neighborsR);
      const medianG: number = this.getMedian(neighborsG);
      const medianB: number = this.getMedian(neighborsB);

      setPixel(x, y, medianR, medianG, medianB, 255);
    };

    for (let y: number = 1; y < height - 1; y++) {
      for (let x: number = 1; x < width - 1; x++) {
        applyMedian(x, y);
      }
    }

    return imageData;
  }

  private getMedian(values: number[]): number {
    const sorted: number[] = values.sort((a: number, b: number) => a - b);
    const middle: number = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
  }
}
