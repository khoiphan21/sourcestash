import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TabComponent', () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabComponent, TestComponentWrapper
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * This is to create a wrapper component, that will pass in some inputs for the 
 * component being tested
 */
@Component({
  selector: 'test-component-wrapper',
  template: '<my-tab [tabsArray]="array"></my-tab>'
})
class TestComponentWrapper {
  array = [];
}
