import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Tab } from '../interface/tab.interface';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'my-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent{
  @Input()
  tabs:TabComponent[];

  @Output() selected = new EventEmitter();
  
  selectTab(tab:Tab) {
    this.tabs.map((tab) => {
      tab.selected = false;
    })
    tab.selected = true;
    this.selected.emit({selectedTab: tab});    
  }
}
