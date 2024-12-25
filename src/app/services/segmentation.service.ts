import {Injectable} from '@angular/core';
import {ErosionService} from './erosion.service';
import {ThresholdService} from './threshold.service';
import {DilateService} from './dilate.service';
import {LinearService} from './linear.service';

@Injectable()
export class SegmentationService {
  constructor(
    private thresholdService: ThresholdService,
    private dilationService: DilateService,
    private erosionService: ErosionService,
    private linearService: LinearService,
  ) {}

  public applySegmentation(imageData: ImageData): ImageData {
    const enhancedData: ImageData = this.linearService.applyLinearFilter(imageData, 10, 30);
    const thresholdedData: ImageData = this.thresholdService.applyThresholdFilter(enhancedData, 224);
    const dilatedData: ImageData = this.dilationService.applyDilation(thresholdedData);
    return this.erosionService.applyErosion(dilatedData);
  }
}
