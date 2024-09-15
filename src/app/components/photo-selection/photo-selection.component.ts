import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilterService} from '../../services/filter.service';
import {Subject} from 'rxjs';
import {ImageProcessingService} from '../../services/image-processing.service';

@Component({
  selector: 'app-photo-selection',
  templateUrl: './photo-selection.component.html',
  styleUrls: ['./photo-selection.component.scss'],
})
export class PhotoSelectionComponent implements OnInit, OnDestroy {
  protected selectedFile: File | null = null;

  protected selectedImage: string = 'assets/img/none.jpg';

  private canvas: HTMLCanvasElement | null = null;

  private context: CanvasRenderingContext2D | null = null;

  private readonly imageProcessingService: ImageProcessingService = inject(ImageProcessingService);

  private readonly filterService: FilterService = inject(FilterService);

  private destroy$: Subject<void> = new Subject<void>();
  public ngOnInit(): void {
    this.filterService.filterSelected$.subscribe(({filter, coefficient, gamma}) => {
      this.applyFilter(filter, coefficient, gamma);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  protected onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader: FileReader = new FileReader();

      reader.onload = (): void => {
        this.selectedImage = reader.result as string;
        this.loadImageToCanvas();
      };

      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  protected onFileDelete(): void {
    this.selectedFile = null;
    this.selectedImage = 'assets/img/none.jpg';
    this.canvas = null;
    this.context = null;
  }

  private loadImageToCanvas(): void {
    const img: HTMLImageElement = new Image();
    img.src = this.selectedImage;
    img.onload = (): void => {
      this.canvas = document.createElement('canvas');
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      this.context = this.canvas.getContext('2d');
      this.context?.drawImage(img, 0, 0);
    };
  }

  private applyFilter(filter: string, coefficient?: number, gamma?: number): void {
    if (this.canvas) {
      this.selectedImage = this.imageProcessingService.applyFilter(
        this.canvas,
        filter,
        Number(coefficient),
        Number(gamma),
      );
    }
  }
}
