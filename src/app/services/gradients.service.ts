import {Injectable} from '@angular/core';

@Injectable()
export class GradientsService {
  // Градиент Робертса
  public applyRobertsGradient(imageData: ImageData): ImageData {
    const width: number = imageData.width;
    const height: number = imageData.height;
    const output: ImageData = new ImageData(width, height);

    const kernelX: number[][] = [
      [1, 0],
      [0, -1],
    ];

    const kernelY: number[][] = [
      [0, 1],
      [-1, 0],
    ];

    this.applyKernel(imageData, output, kernelX, kernelY);
    return output;
  }

  // Градиент Собеля
  public applySobelGradient(imageData: ImageData): ImageData {
    const width: number = imageData.width;
    const height: number = imageData.height;
    const output: ImageData = new ImageData(width, height);

    const kernelX: number[][] = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ];

    const kernelY: number[][] = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ];

    this.applyKernel(imageData, output, kernelX, kernelY);
    return output;
  }

  private applyKernel(input: ImageData, output: ImageData, kernelX: number[][], kernelY: number[][]): void {
    const width: number = input.width;
    const height: number = input.height;

    for (let y: number = 0; y < height; y++) {
      for (let x: number = 0; x < width; x++) {
        const pixelX: number = this.convolve(input, x, y, kernelX);
        const pixelY: number = this.convolve(input, x, y, kernelY);

        const magnitude: number = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
        const offset: number = (y * width + x) * 4;
        output.data[offset] = magnitude;
        output.data[offset + 1] = magnitude;
        output.data[offset + 2] = magnitude;
        output.data[offset + 3] = 255;
      }
    }
  }

  public convolve(imageData: ImageData, x: number, y: number, kernel: number[][]): number {
    const size: number = kernel.length;
    const half: number = Math.floor(size / 2);
    const width: number = imageData.width;
    const data: Uint8ClampedArray = imageData.data;
    let sum: number = 0;

    for (let ky: number = 0; ky < size; ky++) {
      for (let kx: number = 0; kx < size; kx++) {
        const px: number = x + kx - half;
        const py: number = y + ky - half;

        if (px >= 0 && px < width && py >= 0 && py < imageData.height) {
          const offset: number = (py * width + px) * 4;
          const gray: number = 0.2989 * data[offset] + 0.587 * data[offset + 1] + 0.114 * data[offset + 2];
          sum += gray * kernel[ky][kx];
        }
      }
    }
    return sum;
  }
}
