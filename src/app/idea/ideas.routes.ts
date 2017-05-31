import { IdeasComponent } from './ideas.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IdeasComponent },
  ]},
];
