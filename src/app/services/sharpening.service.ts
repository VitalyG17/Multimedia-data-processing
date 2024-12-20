import {Injectable} from '@angular/core';

@Injectable()
export class SharpeningService {
  public applySharpening(imageData: ImageData): ImageData {
    const {data, width, height} = imageData;
    const output: Uint8ClampedArray = new Uint8ClampedArray(data.length);

    const kernel: number[][] = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ];

    for (let y: number = 1; y < height - 1; y++) {
      for (let x: number = 1; x < width - 1; x++) {
        let r: number = 0,
          g: number = 0,
          b: number = 0;

        for (let ky: number = -1; ky <= 1; ky++) {
          for (let kx: number = -1; kx <= 1; kx++) {
            const pixelIndex: number = ((y + ky) * width + (x + kx)) * 4;
            const weight: number = kernel[ky + 1][kx + 1];

            r += data[pixelIndex] * weight;
            g += data[pixelIndex + 1] * weight;
            b += data[pixelIndex + 2] * weight;
          }
        }

        const newIndex: number = (y * width + x) * 4;
        output[newIndex] = this.clamp(r, 0, 255);
        output[newIndex + 1] = this.clamp(g, 0, 255);
        output[newIndex + 2] = this.clamp(b, 0, 255);
        output[newIndex + 3] = data[newIndex + 3];
      }
    }

    imageData.data.set(output);
    return imageData;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
