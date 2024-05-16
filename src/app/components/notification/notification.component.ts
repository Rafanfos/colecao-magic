import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  @Input() message: string = '';
  @Output() closeNotification = new EventEmitter<void>();

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  public close(): void {
    this.closeNotification.emit();
  }
}
