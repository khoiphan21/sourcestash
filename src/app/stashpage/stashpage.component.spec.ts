import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashpageComponent } from './stashpage.component';

describe('StashpageComponent', () => {
  let component: StashpageComponent;
  let fixture: ComponentFixture<StashpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StashpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
