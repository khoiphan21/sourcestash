import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashCreateComponent } from './stash-create.component';

describe('StashCreateComponent', () => {
  let component: StashCreateComponent;
  let fixture: ComponentFixture<StashCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StashCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
