import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-feedback-component',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './feedback-component.component.html',
  styleUrl: './feedback-component.component.css'
})
export class FeedbackComponentComponent  implements OnInit{
  @Input() message: string | string[] = '';
  @Input() type: 'success' | 'error' = 'success';

  ngOnInit() {
    if (this.message) {

      setTimeout(() => {
        this.message = '';
      }, 6000);
    }
  }

  protected readonly Array = Array;
}
