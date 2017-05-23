import { Injectable } from '@angular/core';

export type IdeaType = {
  name: string;
  description: string;
};

@Injectable()
export class IdeaService {

  public _ideas: IdeaType[] = [];

  public ideas(): IdeaType[] {
    return this._ideas;
  }

  public getIdeas(): Promise<IdeaType[]> {
    return Promise.resolve(this._ideas);
  }

  public add(idea: IdeaType) {
    this._ideas.push(idea);
  }

  public size(): number {
    return 1;
  }
}
