import { IdeaService, IdeaType } from './idea.service';

import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import '../../styles/styles.scss';

@Component({
  selector: 'idea',
  template: `
    <h1>Ideas repository</h1>
    <div class="new-idea">
      <div>
        <div>
        Name: <input type="text" class="new-idea-name" [(ngModel)]="ideaName"/>
        </div>
        <div class="new-idea-name-error font-color-red" *ngIf="nameError != null">
          {{nameError}}
        </div>
      </div>
      <div>
        Description: 
        <textarea class="new-idea-description" [(ngModel)]="ideaDesc">
        </textarea>
        <div class="new-idea-desc-error font-color-red" *ngIf="descError != null">
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
  public ideaName = '';
  public ideaDesc = '';
  private ideas: IdeaType[];

  constructor(private ideaService: IdeaService) {
    this.nameError = null;
    this.descError = null;
  }

  public ngOnInit() {
    this.retrieveIdeas();
  }

  public retrieveIdeas() {
    this.ideaService.getIdeas().then((ideas) =>
      this.ideas = ideas
    );
  }

  public saveNewIdea() {
    if (this.ideaName.length === 0) {
      this.nameError = 'The name field cannot be empty';
    } else {
      this.nameError = null;
    }

    if (this.ideaDesc.length === 0) {
      this.descError = 'The description field cannot be empty';
    } else {
      this.descError = null;
    }

    if (this.ideaName.length > 0 && this.ideaDesc.length > 0) {
      this.ideaService.add({name: this.ideaName, description: this.ideaDesc});
      this.retrieveIdeas();
      this.ideaName = '';
      this.ideaDesc = '';
    }
  }
}
