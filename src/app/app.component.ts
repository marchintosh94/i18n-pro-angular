import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <msh-header></msh-header>
    <main class="bg-gradient-default-dark min-h-screen pt-14 pb-10">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
