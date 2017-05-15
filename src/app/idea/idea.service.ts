import { Injectable } from '@angular/core';

export type IdeaType = {
  name: string,
  description: string
};

@Injectable()
export class IdeaService {

  public _ideas: IdeaType[] = [];

  /**
   * Already return a clone of the current ideas.
   */
  public get ideas() {
    return this._ideas;
  }

  public add(idea: IdeaType) {
    this._ideas.push(idea);
  }

}
