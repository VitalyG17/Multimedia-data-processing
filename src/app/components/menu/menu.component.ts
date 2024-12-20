import {Component, inject} from '@angular/core';
import {options} from '../../helpers/buttonOptions';
import {FilterService} from '../../services/filter.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  protected readonly options: string[] = options;

  protected selectedOption: string | undefined = undefined;

  protected coefficient: number | undefined = undefined;

  protected gamma: number | undefined = undefined;

  protected minBrightness: number | undefined = undefined;

  protected maxBrightness: number | undefined = undefined;

  protected selectedMethod: string | undefined = undefined;

  protected threshold: number | undefined = undefined;

  protected gain: number | undefined = undefined;

  protected bias: number | undefined = undefined;

  private readonly morphologicalMethods: string[] = [
    'Дилатация',
    'Эрозия',
    'Замыкание',
    'Размыкание',
    'Выделение границ',
    'Остов',
  ];

  public isMorphologicalMethod: boolean = false;

  private readonly filterService: FilterService = inject(FilterService);

  private readonly dialog: MatDialog = inject(MatDialog);

  protected openDialog(method: string): void {
    this.selectedMethod = method;
    this.dialog.open(DialogComponent, {
      data: {
        method,
      },
    });
  }

  protected selectOption(option: string): void {
    this.selectedOption = option;
    this.updateRadioState();

    if (option === 'Степенное преобразование') {
      this.filterService.selectFilter(option, this.coefficient, this.gamma);
    } else if (option === 'Вырезание диапазона яркостей') {
      this.filterService.selectFilter(option, undefined, undefined, this.minBrightness, this.maxBrightness);
    } else if (option === 'Пороговый фильтр') {
      this.filterService.selectFilter(option, undefined, undefined, undefined, undefined, this.threshold);
    } else if (option === 'Линейный фильтр') {
      this.filterService.selectFilter(
        option,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.gain,
        this.bias,
      );
    } else {
      this.filterService.selectFilter(option);
    }
  }

  private updateRadioState(): void {
    this.isMorphologicalMethod = this.morphologicalMethods.includes(this.selectedOption ?? '');
  }
}
