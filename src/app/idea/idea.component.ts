import { IdeaService, IdeaType } from './idea.service';

import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'idea',
  styles: [

  ],
  template: `
    <h1>Ideas repository</h1>
    <div class="new-idea">
      <div>
        Name: <input type="text" class="new-idea-name"/>
      </div>
      <div>
        Description: 
        <textarea class="new-idea-description">
        </textarea>
      </div>
      <button>Add idea</button>
    </div>
    <div *ngFor="let idea of ideas" class="idea-item">
      <div class="idea-title">
        {{idea.name}}
      </div>
      <div class="idea-description">
        {{idea.description}}
      </div>
    </div>
  `,
})
export class IdeaComponent implements OnInit {
  private ideas: IdeaType[];
  constructor(private ideaService: IdeaService) {

  }

  public ngOnInit() {
    this.retrieveIdeas();
  }

  public retrieveIdeas() {
    this.ideas = this.ideaService.ideas();
  }
}
