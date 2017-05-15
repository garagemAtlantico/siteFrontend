import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IdeaComponent } from './idea.component';

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
  ],
})
export class IdeaModule {
}
