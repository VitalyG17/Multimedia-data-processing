import {Component, inject} from '@angular/core';
import {options} from '../../helpers/buttonOptions';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  protected readonly options: string[] = options;

  protected selectedOption: string | undefined = undefined;

  private readonly filterService: FilterService = inject(FilterService);
  protected selectOption(option: string): void {
    this.selectedOption = option;
    this.filterService.selectFilter(option);
  }
}
