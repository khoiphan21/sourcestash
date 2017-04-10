import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [
        AccountService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([Router], () => {
    expect(component).toBeTruthy();
  }));
});