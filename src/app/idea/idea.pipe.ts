import { Pipe, PipeTransform } from '@angular/core';

import { IdeaType } from './idea.service.interface';

@Pipe({
  name: 'ideaSort',
})
export class IdeaSortPipe implements PipeTransform {
  public transform(array: IdeaType[]): IdeaType[] {
    array.sort((idea1: IdeaType, idea2: IdeaType) => {
      if (idea1.createdAt > idea2.createdAt) {
        return -1;
      } else if (idea1.createdAt < idea2.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
