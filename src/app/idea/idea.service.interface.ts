import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export type IdeaType = {
  name: string;
  description: string;
  creationDate: Date;
};

export interface IdeaServiceInterface {
  ideas(): IdeaType[];

  getIdeas(): Observable<IdeaType[]>;

  add(idea: IdeaType): Observable<IdeaType>;

  size(): Observable<number> ;
}
