import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  dotArr?: number[];
  spaceArr?: number[];
  @Input() step = 0;
  @Input() totalSteps = 3;



  ngOnChanges(): void {
    this.dotArr = Array(this.totalSteps).fill(0).map((x, i) =>
      i <= this.step ? 1 : 0
    );
    this.spaceArr = Array(this.totalSteps - 1).fill(0).map((x, i) =>
      i < this.step ? 1 : 0
    );
  }

}
