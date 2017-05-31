import { IdeaService, IdeaType } from '../idea.service';

import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'newIdea',
  template: `
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
  `,
})
export class NewIdeaComponent {
  @Output()
  public onIdeaAdd = new EventEmitter<boolean>();

  public nameError: string;
  public descError: string;
  public ideaName = '';
  public ideaDesc = '';
  private ideas: IdeaType[];

  constructor(private ideaService: IdeaService) {
    this.nameError = null;
    this.descError = null;
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
      this.onIdeaAdd.emit();
      this.ideaName = '';
      this.ideaDesc = '';
    }
  }
}
