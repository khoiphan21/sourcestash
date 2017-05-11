import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsourceComponent } from './viewsource.component';

describe('ViewsourceComponent', () => {
  let component: ViewsourceComponent;
  let fixture: ComponentFixture<ViewsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
