import { IdeaService } from './idea.service';
import { IdeaType } from './idea.service.interface';

import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import '../../styles/styles.scss';

@Component({
  selector: 'idea',
  template: `
    <div class="idea-title bg-color-green pad-5 font-color-blue">
      {{idea.name}}
    </div>
    <div class="idea-description border-color-grey bordl-1 bordr-1 bordb-1 border-solid pad-5">
      <pre>{{idea.description}}</pre>
    </div>
  `,
})
export class IdeaComponent {
  @Input('idea')
  public idea: IdeaType;

  constructor(private ideaService: IdeaService) {
  }
}
