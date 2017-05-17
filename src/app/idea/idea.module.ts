import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './idea.routes';
import { IdeaComponent } from './idea.component';
import { IdeaService } from './idea.service';

console.log('`Idea` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    IdeaComponent,
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
