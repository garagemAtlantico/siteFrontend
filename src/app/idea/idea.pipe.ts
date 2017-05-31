import { Pipe, PipeTransform } from '@angular/core';

import { IdeaType } from './idea.service';

@Pipe({
  name: 'ideaSort',
})
export class IdeaSortPipe implements PipeTransform {
  public transform(array: IdeaType[]): IdeaType[] {
    array.sort((idea1: IdeaType, idea2: IdeaType) => {
      if (idea1.creationDate < idea2.creationDate) {
        return -1;
      } else if (idea1.creationDate > idea2.creationDate) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}