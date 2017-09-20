import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div>
      <nav>
        <a [routerLink]=" ['./home'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Home
        </a>
        <a [routerLink]=" ['./about'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          About
        </a>
        <a [routerLink]=" ['./idea'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Repository of Ideas
        </a>
      </nav>
    </div>

    <div>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
}
