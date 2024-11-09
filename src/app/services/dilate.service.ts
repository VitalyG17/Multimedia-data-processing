import {Injectable} from '@angular/core';

@Injectable()
export class DilateService {
  public applyDilation(imageData: ImageData): ImageData {
    const data: Uint8ClampedArray = imageData.data;
    const width: number = imageData.width;
    const height: number = imageData.height;
    const output: Uint8ClampedArray = new Uint8ClampedArray(data);

    for (let y: number = 1; y < height - 1; y++) {
      for (let x: number = 1; x < width - 1; x++) {
        const i: number = (y * width + x) * 4;

        let maxR: number = data[i];
        let maxG: number = data[i + 1];
        let maxB: number = data[i + 2];

        for (let dy: number = -1; dy <= 1; dy++) {
          for (let dx: number = -1; dx <= 1; dx++) {
            const ni: number = ((y + dy) * width + (x + dx)) * 4;
            maxR = Math.max(maxR, data[ni]);
            maxG = Math.max(maxG, data[ni + 1]);
            maxB = Math.max(maxB, data[ni + 2]);
          }
        }

        output[i] = maxR;
        output[i + 1] = maxG;
        output[i + 2] = maxB;
      }
    }

    imageData.data.set(output);
    return imageData;
  }
}
