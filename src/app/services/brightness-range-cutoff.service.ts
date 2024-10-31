import {Injectable} from '@angular/core';

@Injectable()
export class BrightnessRangeCutoffService {
  public applyBrightnessRangeCutoff(imageData: ImageData, minBrightness: number, maxBrightness: number): ImageData {
    const data: Uint8ClampedArray = imageData.data;

    for (let i: number = 0; i < data.length; i += 4) {
      const brightness: number = (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (brightness < minBrightness || brightness > maxBrightness) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    return imageData;
  }
}
