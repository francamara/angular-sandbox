import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-sandbox';

  readonly routerLinks: {link: string, displayName: string}[] = [
    {
      link: 'fizz-buzz',
      displayName: 'Fizz Buzz'
    },
    {
      link: 'todo-list',
      displayName: 'TODO List'
    },
    {
      link: 'http-req',
      displayName: 'HTTP Req'
    },
  ]
}
