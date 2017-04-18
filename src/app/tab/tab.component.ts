import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { Tab } from '../interface/tab.interface';

@Component({
  selector: 'my-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input()
  tabTitle: string;

  @Input()
  tabsArray: TabComponent[];
  
  @Input()
  selected: boolean;

  @Output()
  addTabToParent = new EventEmitter();

  constructor() {}
  
  ngOnInit() {
    // this.tabsComponent.addTab(this.tab);
    this.tabsArray.push(this);
  }
}
