import { Component } from '@angular/core';

@Component({
  selector: 'msh-hero-banner',
  imports: [],
  template: `
    <div class="relative -mt-14 isolate overflow-hidden">
      <img
        src="/hero-banner.jpg"
        alt="hero banner"
        class="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950/80 overflow-hidden -z-10"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div
              class="rounded-full px-4 py-2 group def-transition backdrop-blur-sm bg-white/5 ring-1 ring-white/10 hover:ring-white/20"
            >
              <img
                class="h-12 w-auto ml-2 group-hover:brightness-125 def-transition"
                src="/I18npro.png"
                alt="i18nPro Angular"
              />
            </div>
          </div>
          <div class="text-center">
            <h1
              class="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl"
            >
              Translate your
              <img
                class="h-14 w-14 inline-block"
                src="/angular_gradient.png"
                alt="i18nPro Angular"
              />
              apps with Ease
            </h1>
            <p
              class="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8"
            >
              Seamless content localization tools designed to empower global
              reach. Simplify your workflow and deliver tailored user
              experiences
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                class="rounded-md bg-gradient-default-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >Get started</a
              >
              <a href="#" class="text-sm/6 font-semibold text-white"
                >Learn more <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeroBannerComponent {}
