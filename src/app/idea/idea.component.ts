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
        <div>
        Name: <input type="text" class="new-idea-name"/>
        </div>
        <div class="new-idea-error" *ngIf="nameError != null">
          {{nameError}}
        </div>
      </div>
      <div>
        Description: 
        <textarea class="new-idea-description">
        </textarea>
      </div>
      <button class="new-idea-save" (click)="saveNewIdea()">Add idea</button>
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
  public nameError: string;
  private ideas: IdeaType[];
  constructor(private ideaService: IdeaService) {
    this.nameError = null;
  }

  public ngOnInit() {
    this.retrieveIdeas();
  }

  public retrieveIdeas() {
    this.ideas = this.ideaService.ideas();
  }

  public saveNewIdea() {
    this.nameError = 'The name field cannot be empty';
  }
}
