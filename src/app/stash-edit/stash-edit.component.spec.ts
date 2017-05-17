import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashEditComponent } from './stash-edit.component';

describe('StashEditComponent', () => {
  let component: StashEditComponent;
  let fixture: ComponentFixture<StashEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StashEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
