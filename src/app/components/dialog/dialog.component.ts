import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public title: string | null = null;
  public method: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnInit(): void {
    this.title = this.data.title;
    this.method = this.data.method;
  }
}
