import {inject, Injectable} from '@angular/core';
import {LaplacianService} from './laplacian.service';

@Injectable()
export class Sharpeningv2Service {
  private readonly laplacianService: LaplacianService = inject(LaplacianService);

  public applySharpening(imageData: ImageData): ImageData {
    const laplacianImage: ImageData = this.laplacianService.applyLaplacianFilter(imageData);
    const result: Uint8ClampedArray = new Uint8ClampedArray(imageData.data.length);

    for (let i: number = 0; i < imageData.data.length; i += 4) {
      result[i] = this.clamp(imageData.data[i] + laplacianImage.data[i], 0, 255);
      result[i + 1] = this.clamp(imageData.data[i + 1] + laplacianImage.data[i + 1], 0, 255);
      result[i + 2] = this.clamp(imageData.data[i + 2] + laplacianImage.data[i + 2], 0, 255);
      result[i + 3] = imageData.data[i + 3];
    }

    const sharpenedImage: ImageData = new ImageData(imageData.width, imageData.height);
    sharpenedImage.data.set(result);

    return sharpenedImage;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
