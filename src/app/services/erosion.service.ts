import {Injectable} from '@angular/core';

@Injectable()
export class ErosionService {
  public applyErosion(imageData: ImageData): ImageData {
    const data: Uint8ClampedArray = imageData.data;
    const width: number = imageData.width;
    const height: number = imageData.height;
    const output: Uint8ClampedArray = new Uint8ClampedArray(data);

    for (let y: number = 1; y < height - 1; y++) {
      for (let x: number = 1; x < width - 1; x++) {
        const i: number = (y * width + x) * 4;

        let minR: number = data[i];
        let minG: number = data[i + 1];
        let minB: number = data[i + 2];

        for (let dy: number = -1; dy <= 1; dy++) {
          for (let dx: number = -1; dx <= 1; dx++) {
            const ni: number = ((y + dy) * width + (x + dx)) * 4;
            minR = Math.min(minR, data[ni]);
            minG = Math.min(minG, data[ni + 1]);
            minB = Math.min(minB, data[ni + 2]);
          }
        }

        output[i] = minR;
        output[i + 1] = minG;
        output[i + 2] = minB;
      }
    }

    imageData.data.set(output);
    return imageData;
  }
}
