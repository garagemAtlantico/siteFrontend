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
        Name: <input #ideaName type="text" class="new-idea-name" [(ngModel)]="newIdea.name"/>
        </div>
        <div class="new-idea-name-error font-color-red" *ngIf="nameError != null">
          {{nameError}}
        </div>
      </div>
      <div>
        Description: 
        <textarea #ideaDescription class="new-idea-description" [(ngModel)]="newIdea.description">
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
export class IdeaComponent implements OnInit, OnChanges {
  public nameError: string;
  public descError: string;
  public newIdea: IdeaType;
  private ideas: IdeaType[];
  @ViewChild('ideaName') private ideaNameInput;
  @ViewChild('ideaDescription') private ideaDescriptionInput;

  constructor(private ideaService: IdeaService) {
    this.nameError = null;
    this.descError = null;
    this.newIdea = { name: '', description: '' };
  }

  public ngOnInit() {
    this.retrieveIdeas();
    this.newIdea = { name: '', description: '' };
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('changed stuff, ', this.newIdea);
  }

  public ngDoCheck() {
    console.log('doCheck', this.ideaNameInput.nativeElement.value);
    this.newIdea.name = this.ideaNameInput.nativeElement.value;
    this.newIdea.description = this.ideaDescriptionInput.nativeElement.value;
  }

  public retrieveIdeas() {
    this.ideaService.getIdeas().then(ideas =>
      this.ideas = ideas
    );
  }

  public saveNewIdea() {
    if (this.newIdea.name.length === 0) {
      this.nameError = 'The name field cannot be empty';
    } else {
      this.nameError = null;
    }

    if (this.newIdea.description.length === 0) {
      this.descError = 'The description field cannot be empty';
    } else {
      this.descError = null;
    }

    if (this.newIdea.name.length > 0 && this.newIdea.description.length > 0) {
      this.ideaService.add(this.newIdea);
      this.retrieveIdeas();
      this.newIdea = { name: '', description: '' };
    }
  }
}
