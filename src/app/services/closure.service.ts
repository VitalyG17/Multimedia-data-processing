import {inject, Injectable} from '@angular/core';
import {DilateService} from './dilate.service';
import {ErosionService} from './erosion.service';

@Injectable()
export class ClosureService {
  private readonly dilateService: DilateService = inject(DilateService);

  private readonly erosionService: ErosionService = inject(ErosionService);

  public applyClosing(imageData: ImageData): ImageData {
    const dilatedData: ImageData = this.dilateService.applyDilation(imageData);
    return this.erosionService.applyErosion(dilatedData);
  }
}
