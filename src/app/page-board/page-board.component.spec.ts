import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBoardComponent } from './page-board.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('PageBoardComponent', () => {
  let component: PageBoardComponent;
  let fixture: ComponentFixture<PageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageBoardComponent,
        HeaderComponent,
        FooterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
