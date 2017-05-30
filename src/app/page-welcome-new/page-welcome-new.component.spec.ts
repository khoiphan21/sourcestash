import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWelcomeNewComponent } from './page-welcome-new.component';

describe('PageWelcomeNewComponent', () => {
  let component: PageWelcomeNewComponent;
  let fixture: ComponentFixture<PageWelcomeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWelcomeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWelcomeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
