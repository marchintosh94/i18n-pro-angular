import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'msh-main-menu',
  imports: [RouterLink],
  template: `
    <a
      routerLinkActive="active"
      routerLink="/docs"
      class="text-sm/6 font-semibold"
      >Docs</a
    >
    <a
      target="_blank"
      href="https://github.com/marchintosh94/i18n-pro-angular"
      class="text-sm/6 font-semibold"
      ><img class="h-4 w-4" src="/GitHub.svg"
    /></a>
    <a
      target="_blank"
      href="https://www.npmjs.com/~marchintosh94"
      class="text-sm/6 font-semibold"
      ><img class="h-6 w-6" src="/npm.svg"/></a
    >
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class MainMenuComponent {}
