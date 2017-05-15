import {
  Component,
  OnInit,
} from '@angular/core';
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Idea` component loaded asynchronously');

@Component({
  selector: 'idea',
  template: `
    <h1>Hello from Idea</h1>
    <span>
    </span>
  `,
})
export class IdeaComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Idea` component');
  }

}
