import { Component, OnInit, ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() sourceID: number;
  @Input() sourceTitle: string;
  @Input() sourceDescription: string;

  ngOnInit() {
    // Get the modal
    let modal = document.getElementById('myModal');
    // let source = document.getElementById({{sourceID}});
    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the div element (x) that closes the modal
    let x = document.getElementById("close");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
      modal.style.display = "block";
    }

    // When the user clicks on (x), close the modal
    x.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}
