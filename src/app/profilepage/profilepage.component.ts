import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';
import { Tab } from '../interface/tab.interface';
import { TabComponent } from '../tab/tab.component';
import { TabsComponent } from '../tabs/tabs.component';


@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
})
export class ProfilepageComponent implements OnInit {
  userAccount: Account;
  tabs: TabComponent[] = [];
  isStashesClicked: boolean = true;
  isSettingsClicked: boolean = false;
  isCreateClicked: boolean = false;


  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getUserInformation('user').then(account => {
      this.userAccount = account;
    });
  }

  clickTab(tabname: string) {
    if (tabname == 'clickStash') {
      this.isStashesClicked = true;
      this.isSettingsClicked = false;
      this.isCreateClicked = false;
    } else if (tabname == 'clickSetting') {
      this.isStashesClicked = false;
      this.isSettingsClicked = true;
      this.isCreateClicked = false;
    } else if (tabname == 'clickCreate') {
      this.isStashesClicked = false;
      this.isSettingsClicked = false;
      this.isCreateClicked = true;
    }
  }

}
