import {Injectable} from '@angular/core';

@Injectable()
export class LaplacianService {
  private laplacianKernel: number[][] = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
  ];

  public applyLaplacianFilter(imageData: ImageData): ImageData {
    const data: Uint8ClampedArray = imageData.data;
    const width: number = imageData.width;
    const height: number = imageData.height;
    const outputData: Uint8ClampedArray = new Uint8ClampedArray(data.length);

    for (let y: number = 1; y < height - 1; y++) {
      for (let x: number = 1; x < width - 1; x++) {
        const idx: number = (y * width + x) * 4;

        for (let channel: number = 0; channel < 3; channel++) {
          let newValue: number = 0;

          for (let ky: number = -1; ky <= 1; ky++) {
            for (let kx: number = -1; kx <= 1; kx++) {
              const neighborIdx: number = ((y + ky) * width + (x + kx)) * 4 + channel;
              newValue += data[neighborIdx] * this.laplacianKernel[ky + 1][kx + 1];
            }
          }

          outputData[idx + channel] = Math.min(Math.max(newValue, 0), 255);
        }

        outputData[idx + 3] = data[idx + 3];
      }
    }

    return new ImageData(outputData, width, height);
  }
}
