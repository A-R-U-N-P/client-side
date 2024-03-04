// toast.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-toast',
    imports: [CommonModule],
    standalone: true,
    template: `
    <div *ngIf="showToast" [ngClass]="{'toast': true, 'show': showToast, 'bg-success': success, 'bg-danger': !success}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">{{ success ? 'Success' : 'Error' }}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" (click)="hideToast()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ message }}
      </div>
    </div>
  `,
    styles: [`
    .toast {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1000;
    }
  `]
})
export class ToastComponent {
    @Input() success: boolean = true;
    @Input() message: string = '';
    showToast: boolean = true;

    hideToast(): void {
        this.showToast = false;
    }
}
