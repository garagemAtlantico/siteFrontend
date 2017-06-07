import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IdeaType, IdeaServiceInterface } from './idea.service.interface';

@Injectable()
export class IdeaService implements IdeaServiceInterface {

  public static createIdea(json): IdeaType {
    return {
      name: json['name'],
      description: json['description'],
      creationDate: new Date(json['date'])
    };
  }

  public _ideas: IdeaType[] = [];

  constructor(private http: Http) { }

  public ideas(): IdeaType[] {
    return this._ideas;
  }

  public getIdeas(): Observable<IdeaType[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = {};
    headerOptions['headers'] = headers;
    let options = new RequestOptions(headerOptions);
    return this.http.get('http://localhost:3000/ideas', options)
      .map(this.convertToIdeas)
      .map((ideas) => this._ideas = ideas)
      .catch(this.handleError);
  }

  public add(idea: IdeaType): Observable<IdeaType> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = {};
    headerOptions['headers'] = headers;
    let options = new RequestOptions(headerOptions);
    return this.http.post('http://localhost:3000/ideas', idea, options)
      .map(this.convertToIdea)
      .catch(this.handleError);
  }

  public size(): Observable<number> {
    return Observable.of(this._ideas.length);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    console.error('error:', error);
    return Observable.throw(errMsg);
  }

  private convertToIdea(jsonResponse): IdeaType {
    let jsonObject = jsonResponse.json()[0];
    return IdeaService.createIdea(jsonObject);
  }

  private convertToIdeas(jsonResponse): IdeaType[] {
    let jsonObject = jsonResponse.json();
    let allResults = [];
    jsonObject.forEach((idea) => {
      allResults.push(IdeaService.createIdea(idea));
    });

    return allResults;
  }
}
