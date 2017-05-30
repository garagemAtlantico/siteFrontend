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
    <div class="box-vertical full-width box-center">
      <div class="new-idea box-item-2 width-30">
        <div class="box-horizontal"> 
          <div class="box-item-1">
            Name: 
          </div>
          <div class="box-item-1">
            <input type="text" class="new-idea-name" [(ngModel)]="ideaName"/>
          </div>
          <div class="box-item-2">
            <div class="new-idea-name-error font-color-red padl-2" *ngIf="nameError != null">
              {{nameError}}
            </div>
          </div>
        </div>
        <div class="box-horizontal">
          <div class="box-item-1">
            Description: 
          </div>
          <div class="box-item-1">
            <textarea class="new-idea-description" [(ngModel)]="ideaDesc">
            </textarea>
          </div>
          <div class="box-item-2">
            <div class="new-idea-desc-error font-color-red padl-2" *ngIf="descError != null">
              {{descError}}
            </div>
          </div>
        </div>
        <button class="new-idea-save" (click)="saveNewIdea()">Add idea</button>
      </div>
      <div *ngFor="let idea of ideas" class="idea-item box-item-1 padt-5">
        <div class="idea-title bg-color-blue pad-5 font-color-white">
          {{idea.name}}
        </div>
        <div class="idea-description border-color-grey bordl-1 bordr-1 bordb-1 border-solid">
          {{idea.description}}
        </div>
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
      this.ideaService.add({ name: this.ideaName, description: this.ideaDesc });
      this.retrieveIdeas();
      this.ideaName = '';
      this.ideaDesc = '';
    }
  }
}
