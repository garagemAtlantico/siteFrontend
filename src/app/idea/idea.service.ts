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

  public add(idea: IdeaType): Promise<IdeaType> {
    return new Promise((promise) => {
      this._ideas.push(idea);
      promise(idea);
    });
  }

  public size(): Promise<number> {
    return Promise.resolve(this._ideas.length);
  }
}
