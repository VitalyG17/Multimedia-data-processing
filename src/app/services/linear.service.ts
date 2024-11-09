import {Injectable} from '@angular/core';

@Injectable()
export class LinearService {
  public applyLinearFilter(imageData: ImageData, gain: number, bias: number): ImageData {
    const data: Uint8ClampedArray = imageData.data;

    for (let i: number = 0; i < data.length; i += 4) {
      data[i] = this.clamp(data[i] * gain + bias);
      data[i + 1] = this.clamp(data[i + 1] * gain + bias);
      data[i + 2] = this.clamp(data[i + 2] * gain + bias);
    }

    return imageData;
  }

  private clamp(value: number): number {
    return Math.min(255, Math.max(0, value));
  }
}
