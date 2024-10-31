import {Injectable} from '@angular/core';

@Injectable()
export class ThresholdService {
  public applyThresholdFilter(imageData: ImageData, threshold: number): ImageData {
    const data: Uint8ClampedArray = imageData.data;

    for (let i: number = 0; i < data.length; i += 4) {
      const brightness: number = (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (brightness > threshold) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    return imageData;
  }
}
