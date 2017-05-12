import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomepageComponent } from './welcomepage.component';
import { FooterComponent } from '../footer/footer.component';

describe('WelcomepageComponent', () => {
  let component: WelcomepageComponent;
  let fixture: ComponentFixture<WelcomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        WelcomepageComponent,
        FooterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
