import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstashComponent } from './addstash.component';

describe('AddstashComponent', () => {
  let component: AddstashComponent;
  let fixture: ComponentFixture<AddstashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
