import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <h1>About</h1>
    Developed by Joao Pereira<br>
    <a href="http://jpereira.co.uk">Website</a>
  `
})
export class AboutComponent implements OnInit {
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
  }
}
