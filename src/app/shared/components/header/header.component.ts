import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { MainMenuComponent } from "../menu/main-menu/main-menu.component";

@Component({
  selector: 'msh-header',
  imports: [RouterLink, RouterLinkActive, LogoComponent, MainMenuComponent],
  template: `
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a routerLink="/" class="-m-1.5 p-1.5">
            <span class="sr-only">i18nPro Angular</span>
            <msh-logo></msh-logo>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            (click)="toggleMenu()"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12 lg:items-center">
          <msh-main-menu></msh-main-menu>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            (click)="toggleExampleRoutes()"
            [class]="exampleRoutesOpen() ? 'pr-3 border-r-[1px] mr-6' : ''"
            class="text-md/6 font-semibold"
          >
            Examples @if(!exampleRoutesOpen()){&rarr;}
          </button>
          <div
            [class]="exampleRoutesOpen() ? 'lg:w-52' : 'w-0'"
            class="lg:flex lg:gap-x-8 def-transition overflow-hidden"
          >
            @for (route of exampleRoutes; track route.link) {
            <a
              routerLinkActive="active"
              [routerLink]="route.link"
              class="text-sm/6 font-semibold"
              >{{ route.label }}</a
            >
            }
          </div>
        </div>
      </nav>

      @if(mobileMenuOpen()){
      <div class="lg:hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 z-10"></div>
        <div
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">i18nPro Angular</span>
              <msh-logo />
            </a>
            <button
              type="button"
              (click)="toggleMenu()"
              class="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/25">
              <div class="space-y-2 pb-6 pt-4">
                <span
                  class="text-gray-400 text-sm
                "
                  >Main</span
                >
                <a
                  routerLink="/docs"
                  routerLinkActive="active"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800"
                  >Docs</a
                >
              </div>
              <div class="space-y-2 pb-6 pt-2">
                <span
                  class="text-gray-400 text-sm
                "
                  >Examples</span
                >
                @for (route of exampleRoutes; track route.link) {
                <a
                  [routerLink]="route.link"
                  routerLinkActive="active"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800"
                  >{{ route.label }}</a
                >
                }
              </div>
              <div class="space-x-6 py-6 flex items-center">
                <a
                  target="_blank"
                  href="https://github.com/marchintosh94/i18n-pro-angular"
                  class="text-sm/6 font-semibold"
                  ><img class="h-8 w-8" src="/GitHub.svg"
                /></a>
                <a
                  target="_blank"
                  href="https://www.npmjs.com/~marchintosh94"
                  class="text-sm/6 font-semibold"
                  ><img class="h-10 w-10" src="/npm.svg"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);
  exampleRoutesOpen = signal(false);
  exampleRoutes = [
    {
      label: 'Basic',
      link: '/example/basic',
    },
    {
      label: 'Directive',
      link: '/example/directive',
    },
    {
      label: 'Pipe',
      link: '/example/pipe',
    },
  ];
  mainRoutes = [
    {
      label: 'Docs',
      link: '/docs',
    },
    {
      label: 'GitHub',
      link: 'https://github.com/marchintosh94/i18n-pro-angular',
    },
    {
      label: 'Npm',
      link: 'https://github.com/marchintosh94/i18n-pro-angular',
    },
  ];

  toggleMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }

  toggleExampleRoutes() {
    this.exampleRoutesOpen.update((value) => !value);
  }
}
