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
  selector: 'ideas',
  template: `
    <h1>Ideas repository</h1>
    <div class="box-vertical full-width box-center">
      <div class="new-idea box-item-2 width-30">
        <newIdea (onIdeaAdd)="retrieveIdeas()">
        </newIdea>
      </div>
      <div *ngFor="let idea of (ideas | ideaSort)" class="idea-item box-item-1 padt-5">
        <idea [idea]="idea">
        </idea>
      </div>
    </div>
  `,
})
export class IdeasComponent implements OnInit {
  private ideas: IdeaType[];

  constructor(private ideaService: IdeaService) {
    this.ideas = [];
  }

  public ngOnInit() {
    this.retrieveIdeas();
  }

  public retrieveIdeas() {
    this.ideaService.getIdeas().then((ideas) =>
      this.ideas = ideas
    );
  }
}
