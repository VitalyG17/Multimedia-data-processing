import {inject, Injectable} from '@angular/core';
import {DilateService} from './dilate.service';
import {ErosionService} from './erosion.service';

@Injectable()
export class SkeletonService {
  private readonly dilateService: DilateService = inject(DilateService);

  private readonly erosionService: ErosionService = inject(ErosionService);

  public applySkeleton(imageData: ImageData): ImageData {
    const width: number = imageData.width;
    const height: number = imageData.height;
    const skeleton: ImageData = new ImageData(width, height);

    let erodedImage: ImageData = new ImageData(imageData.data.slice(), width, height);

    while (this.isIdentical) {
      const previousImageData: Uint8ClampedArray = erodedImage.data.slice();

      erodedImage = this.erosionService.applyErosion(erodedImage);

      const closedImage: ImageData = this.dilateService.applyDilation(erodedImage);

      for (let i: number = 0; i < skeleton.data.length; i += 4) {
        skeleton.data[i] = imageData.data[i] - closedImage.data[i];
        skeleton.data[i + 1] = imageData.data[i + 1] - closedImage.data[i + 1];
        skeleton.data[i + 2] = imageData.data[i + 2] - closedImage.data[i + 2];
        skeleton.data[i + 3] = 255;
      }

      if (this.isIdentical(previousImageData, erodedImage.data)) {
        break;
      }
    }
    return skeleton;
  }

  private isIdentical(data1: Uint8ClampedArray, data2: Uint8ClampedArray): boolean {
    for (let i: number = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i]) return false;
    }
    return true;
  }
}
