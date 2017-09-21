import { IdeaService } from './idea.service';
import { IdeaType } from './idea.service.interface';

import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import '../../styles/styles.scss';

@Component({
  selector: 'ideas',
  template: `
    <h1>Ideas repository</h1>
    <div class="box-vertical full-width box-center">
      <div class="new-idea box-item-1 width-30">
        <newIdea (onIdeaAdd)="retrieveIdeas()" *ngIf="showIdeaForm">
        </newIdea>
        <button
          *ngIf="!showIdeaForm"
          (click)="showIdeaForm=!showIdeaForm"
          class="unhide-new-idea-form">
          Add new Idea
        </button>
      </div>
      <div *ngFor="let idea of (ideas | ideaSort)"
            class="idea-item box-item-1 padt-5 width-100-sm width-33">
        <idea [idea]="idea">
        </idea>
      </div>
    </div>
  `,
})
export class IdeasComponent implements OnInit {
  public showIdeaForm: boolean = false;
  private ideas: IdeaType[];

  constructor(private ideaService: IdeaService) {
    this.ideas = [];
  }

  public ngOnInit() {
    this.retrieveIdeas();
  }

  public retrieveIdeas() {
    this.ideaService.getIdeas().subscribe((ideas) =>
      this.ideas = ideas
    );
  }
}
