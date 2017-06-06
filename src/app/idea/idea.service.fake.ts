import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IdeaType, IdeaServiceInterface } from './idea.service.interface';

@Injectable()
export class IdeaServiceFake implements IdeaServiceInterface {

  public _ideas: IdeaType[] = [];

  public ideas(): IdeaType[] {
    return this._ideas;
  }

  public getIdeas(): Observable<IdeaType[]> {
    return Observable.of(Object.assign([], this._ideas));
  }

  public add(idea: IdeaType): Observable<IdeaType> {
    idea.creationDate = new Date();
    this._ideas.push(idea);
    return Observable.of(idea);
  }

  public size(): Observable<number> {
    return Observable.of(this._ideas.length);
  }
}
