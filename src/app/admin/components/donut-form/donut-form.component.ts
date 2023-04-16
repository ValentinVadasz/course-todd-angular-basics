import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Donut} from '../../models/donut.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'donut-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  template: `
    <form #form="ngForm" class="donut-form" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input class="input"
               name="name"
               type="text"
               [ngModel]="donut.name"
               [ngModelOptions]="{updateOn: 'change'}"
               required
               minlength="5"
               #name='ngModel'>

        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">Name is required.</div>
        </ng-container>
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.minlength">Minimum is 5</div>
        </ng-container>
      </label>

      <label for="">
        <span>Icon</span>
        <select class="input input--select" name="icon"
                [ngModel]="donut.icon"
                required #icon='ngModel'>
          <option *ngFor="let icon of icons" [ngValue]="icon">{{icon}}</option>
        </select>
        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">Icon is required.</div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input class="input"
               name="price"
               type="number"
               [ngModel]="donut.price"
               required
               #price='ngModel'>
        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">Price is required.</div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label for="">
          <input type="radio" name="promo" [value]="undefined"
                 [ngModel]="donut.promo">
          <span>None</span>
        </label>
        <label for="">
          <input type="radio" name="promo" value="new"
                 [ngModel]="donut.promo">
          <span>New</span>
        </label>
        <label for="">
          <input type="radio" name="promo" value="limited"
                 [ngModel]="donut.promo">
          <span>Limited</span>
        </label>
      </div>

      <label for="">
        <span>Description</span>
        <textarea name="description"
                  class="input input--textarea"
                  [ngModel]="donut.description"
                  required #description='ngModel'></textarea>
        <ng-container *ngIf="description.invalid && description.touched">
          <div class="donut-form-error" *ngIf="description.errors?.required">Description is required.</div>
        </ng-container>
      </label>
      <button class="btn btn--green"
              type="button"
              *ngIf="!isEdit"
              (click)="handleCreate(form)">
        Create
      </button>

      <button class="btn btn--green"
              type="button"
              *ngIf="isEdit"
              [disabled]="!form.dirty"
              (click)="handleUpdate(form)">
        Update
      </button>

      <button class="btn btn--red"
              type="button"
              *ngIf="isEdit"
              (click)="handleDelete()">
        Delete
      </button>

      <button class="btn btn--grey"
              type="button"
              *ngIf="isEdit"
              (click)="form.reset()">
        Reset Form
      </button>

      <div *ngIf="form.valid && form.submitted" class="donut-form-working">
        working...
      </div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;

          &-label {
            margin-right: 10px;
          }

          label {
            display: flex;
            align-items: center;

            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }

        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }

        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `
  ]
})
export class DonutFormComponent {
  @Input() donut!: Donut;
  @Input() isEdit!: boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze'
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({id: this.donut.id, ...form.value});
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    if (confirm(`Really delete ${this.donut.name}?`))
      this.delete.emit({...this.donut});
  }
}
