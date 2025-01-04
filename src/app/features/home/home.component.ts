import { Component } from '@angular/core';
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";

@Component({
  selector: 'msh-home',
  imports: [HeroBannerComponent],
  template: `
    <msh-hero-banner/>
  `,
  styles: ``
})
export class HomeComponent {

}
