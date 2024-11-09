import {inject, Injectable} from '@angular/core';
import {DilateService} from './dilate.service';
import {ErosionService} from './erosion.service';

@Injectable()
export class OpeningService {
  private readonly dilateService: DilateService = inject(DilateService);

  private readonly erosionService: ErosionService = inject(ErosionService);

  public applyOpening(imageData: ImageData): ImageData {
    const erosionData: ImageData = this.erosionService.applyErosion(imageData);
    return this.dilateService.applyDilation(erosionData);
  }
}
