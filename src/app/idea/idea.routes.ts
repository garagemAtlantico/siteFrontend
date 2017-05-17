import { IdeaComponent } from './idea.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IdeaComponent },
  ]},
];
