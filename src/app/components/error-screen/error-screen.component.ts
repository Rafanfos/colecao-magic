import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrl: './error-screen.component.scss',
})
export class ErrorScreenComponent {
  @Input() currentComponent: string | undefined;
}
