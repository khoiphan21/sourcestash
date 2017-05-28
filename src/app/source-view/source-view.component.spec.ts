import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceViewComponent } from './source-view.component';
import { Source } from '../classes/source';
import { Component } from '@angular/core';

describe('SourceViewComponent', () => {
  let component: SourceViewWrapper;
  let fixture: ComponentFixture<SourceViewWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SourceViewComponent,
        SourceViewWrapper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceViewWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'source-view-wrapper',
  template: '<app-source-view [source]="source"></app-source-view>'
})
class SourceViewWrapper {
  source: Source = new Source(
    '','','','','',0,0,'','','','',[
      'tag1', 'tag2'
    ]
  )
}