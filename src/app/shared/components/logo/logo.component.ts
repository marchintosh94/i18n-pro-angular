import { Component } from '@angular/core';

@Component({
  selector: 'msh-logo',
  imports: [],
  template: `
    <div class="flex items-center space-x-1 px-2 py-1 bg-black/15 rounded-md">
      <img
        class="h-6 w-auto"
        src="/I18npro.png"
        alt="i18nPro Angular"
      />
      <img class="h-8 w-8" src="/angular_gradient.png" alt="i18nPro Angular" />
    </div>
  `,
  styles: ``,
})
export class LogoComponent {}
