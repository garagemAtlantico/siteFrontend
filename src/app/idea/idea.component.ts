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
        Name: <input type="text" class="new-idea-name" [(ngModel)]="newIdea.name"/>
        </div>
        <div class="new-idea-name-error" *ngIf="nameError != null">
          {{nameError}}
        </div>
      </div>
      <div>
        Description: 
        <textarea class="new-idea-description" [(ngModel)]="newIdea.description">
        </textarea>
        <div class="new-idea-desc-error" *ngIf="descError != null">
          {{descError}}
        </div>
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
  public descError: string;
  public newIdea: IdeaType;
  private ideas: IdeaType[];
  constructor(private ideaService: IdeaService) {
    this.nameError = null;
    this.descError = null;
    this.newIdea = { name: '', description: '' };
  }

  public ngOnInit() {
    this.retrieveIdeas();
    this.newIdea = { name: '', description: '' };
  }

  public retrieveIdeas() {
    this.ideas = this.ideaService.ideas();
  }

  public saveNewIdea() {
    if (this.newIdea.name.length === 0) {
      this.nameError = 'The name field cannot be empty';
    }
    if (this.newIdea.description.length === 0) {
      this.descError = 'The description field cannot be empty';
    }
    if(this.newIdea.name.length > 0 && this.newIdea.description.length > 0) {
      this.ideas.push(this.newIdea);
      this.newIdea = { name: '', description: '' };
    }
  }
}
