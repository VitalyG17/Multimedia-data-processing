import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {HistogramService} from '../../services/histogram.service';

export interface Histogram {
  red: number[];
  green: number[];
  blue: number[];
}

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss'],
})
export class HistogramComponent {
  private readonly histogramService: HistogramService = inject(HistogramService);

  @ViewChild('histogramCanvas', {static: true}) private histogramCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() public set imageData(imageData: ImageData | null) {
    if (imageData) {
      this.drawHistogram(imageData);
    }
  }

  public drawHistogram(imageData: ImageData): void {
    const histogram: Histogram = this.histogramService.calculateHistogram(imageData);
    const canvas: HTMLCanvasElement = this.histogramCanvas.nativeElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
      this.clearCanvas(ctx);

      const barWidth: number = canvas.width / 256;
      const maxCount: number = Math.max(...histogram.red, ...histogram.green, ...histogram.blue);

      for (let i: number = 0; i < 256; i++) {
        const redHeight: number = (histogram.red[i] / maxCount) * canvas.height;
        const greenHeight: number = (histogram.green[i] / maxCount) * canvas.height;
        const blueHeight: number = (histogram.blue[i] / maxCount) * canvas.height;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(i * barWidth, canvas.height - redHeight, barWidth, redHeight);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(i * barWidth, canvas.height - greenHeight, barWidth, greenHeight);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(i * barWidth, canvas.height - blueHeight, barWidth, blueHeight);
      }
    }
  }

  private clearCanvas(ctx: CanvasRenderingContext2D): void {
    const canvas: HTMLCanvasElement = this.histogramCanvas.nativeElement;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
