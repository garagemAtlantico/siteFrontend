import { IdeaService } from '../idea.service';
import { IdeaType } from '../idea.service.interface';

import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'newIdea',
  template: `
  <div class="round-corners pad-10 bg-color-yellow font-color-brown">
    <div class="box-vertical">
      <div class="box-item-1">
        Name:
      </div>
      <div class="box-item-2 padr-5">
        <input type="text" class="new-idea-name width-100" [(ngModel)]="ideaName"/>
      </div>
      <div class="box-item-3">
        <div class="new-idea-name-error font-color-red padl-2" *ngIf="nameError != null">
          {{nameError}}
        </div>
      </div>
    </div>
    <div class="box-vertical">
      <div class="box-item-1">
        Description:
      </div>
      <div class="box-item-2 padr-5">
        <textarea class="new-idea-description width-100" [(ngModel)]="ideaDesc" rows="6">
        </textarea>
      </div>
      <div class="box-item-3">
        <div class="new-idea-desc-error font-color-red padl-2" *ngIf="descError != null">
          {{descError}}
        </div>
      </div>
    </div>
    <button class="new-idea-save button" (click)="saveNewIdea()">Add idea</button>
  </div>
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
      let newIdea = {
        name: this.ideaName,
        description: this.ideaDesc,
        createdAt: null,
        updatedAt: null
      };
      this.ideaService.add(newIdea).subscribe(() => {
        this.onIdeaAdd.emit();
        this.ideaName = '';
        this.ideaDesc = '';
      });
    }
  }
}
