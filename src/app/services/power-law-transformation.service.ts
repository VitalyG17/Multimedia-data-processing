import {Injectable} from '@angular/core';

@Injectable()
export class PowerLawTransformationService {
  public applyPowerLawTransformation(imageData: ImageData, gamma: number, c: number): ImageData {
    const data: Uint8ClampedArray = imageData.data;
    for (let i: number = 0; i < data.length; i += 4) {
      data[i] = c * Math.pow(data[i] / 255, gamma) * 255;
      data[i + 1] = c * Math.pow(data[i + 1] / 255, gamma) * 255;
      data[i + 2] = c * Math.pow(data[i + 2] / 255, gamma) * 255;
    }
    return imageData;
  }
}
