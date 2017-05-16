import { IdeaService, IdeaType } from './idea.service';

import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'idea',
  template: `
    <h1>Hello from Idea</h1>
    <div *ngFor="let idea of ideas" class="idea-item">
    </div>
  `,
})
export class IdeaComponent implements OnInit {
  private ideas: IdeaType[];
  constructor(private ideaService: IdeaService) {

  }

  public ngOnInit() {
    console.log('hello `Idea` component');
  }

}
