import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './ideas.routes';
import { IdeasComponent } from './ideas.component';
import { IdeaComponent } from './idea.component';
import { NewIdeaComponent } from './new/new.idea.component';
import { IdeaService } from './idea.service';

console.log('`Idea` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    IdeasComponent,
    IdeaComponent,
    NewIdeaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    IdeaService
  ]
})
export class IdeaModule {
  public static routes = routes;
}
