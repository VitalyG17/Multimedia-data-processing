import {inject, Injectable} from '@angular/core';
import {GradientsService} from './gradients.service';

@Injectable()
export class HighlightingBordersService {
  private readonly gradientsService: GradientsService = inject(GradientsService);
  public applyEdgeDetection(imageData: ImageData): ImageData {
    const width: number = imageData.width;
    const height: number = imageData.height;
    const output: ImageData = new ImageData(width, height);

    const kernel: number[][] = [
      [0, -1, 0],
      [-1, 4, -1],
      [0, -1, 0],
    ];

    this.applySingleKernel(imageData, output, kernel);
    return output;
  }

  private applySingleKernel(input: ImageData, output: ImageData, kernel: number[][]): void {
    const width: number = input.width;
    const height: number = input.height;

    for (let y: number = 0; y < height; y++) {
      for (let x: number = 0; x < width; x++) {
        const offset: number = (y * width + x) * 4;
        const edge: number = Math.abs(this.gradientsService.convolve(input, x, y, kernel));

        output.data[offset] = edge;
        output.data[offset + 1] = edge;
        output.data[offset + 2] = edge;
        output.data[offset + 3] = 255;
      }
    }
  }
}
