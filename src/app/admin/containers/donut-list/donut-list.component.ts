import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

import {DonutCardComponent} from '../../components/donut-card/donut-card.component';
import {DonutService} from '../../services/donut.service';
import {Donut} from '../../models/donut.model';

@Component({
  selector: 'donut-list',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgForOf,
    DonutCardComponent
  ],
  template: `
    <div class="donut-list-actions">
      <a routerLink="new" class="btn btn--green">
        New Donut
        <img src="/assets/img/icon/plus.svg">
      </a>
    </div>
    <ng-container *ngIf="donuts?.length; else nothing">
      <donut-card *ngFor="let donut of donuts; trackBy: trackById"
                  [donut]="donut">
      </donut-card>
    </ng-container>

    <ng-template #nothing>
      <p>No Donuts here...</p>
    </ng-template>
  `,
  styles: [`
    .donut-list {
      &-actions {
        margin-bottom: 10px;
      }
    }
  `]
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {
  }

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe({
        next: (value: Donut[]) => this.donuts = value
      });
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
