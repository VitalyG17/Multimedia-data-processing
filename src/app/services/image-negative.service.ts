import {Injectable} from '@angular/core';

@Injectable()
export class ImageNegativeService {
  public applyNegativeFilter(imageData: ImageData): ImageData {
    const data: Uint8ClampedArray = imageData.data;

    for (let i: number = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return imageData;
  }
}
