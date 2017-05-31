import { IdeaService, IdeaType } from './idea.service';

import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import '../../styles/styles.scss';

@Component({
  selector: 'idea',
  template: `
    <div class="idea-title bg-color-blue pad-5 font-color-white">
      {{idea.name}}
    </div>
    <div class="idea-description border-color-grey bordl-1 bordr-1 bordb-1 border-solid">
      {{idea.description}}
    </div>
  `,
})
export class IdeaComponent {
  @Input('idea')
  public idea: IdeaType;

  constructor(private ideaService: IdeaService) {
  }
}
