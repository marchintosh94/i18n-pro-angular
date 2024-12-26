import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nProAngularComponent } from './i18n-pro-angular.component';

describe('I18nProAngularComponent', () => {
  let component: I18nProAngularComponent;
  let fixture: ComponentFixture<I18nProAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nProAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(I18nProAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
