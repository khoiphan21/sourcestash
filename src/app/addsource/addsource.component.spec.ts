import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsourceComponent } from './addsource.component';

describe('AddsourceComponent', () => {
  let component: AddsourceComponent;
  let fixture: ComponentFixture<AddsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
