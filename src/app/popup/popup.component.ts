import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
// import { overlay };
// import * as Modal from 'modal';
// https://www.npmjs.com/package/angular2-modal
// https://github.com/shlomiassaf/angular2-modal/blob/master/QUICKTHROUGH.md

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  // constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
  //   overlay.defaultViewContainer = vcRef;
  // }

  // onClick() {
  //   this.modal.alert()
  //       .size('lg')
  //       .showClose(true)
  //       .title('A simple Alert style modal window')
  //       .body(`
  //           <h4>Alert is a classic (title/body/footer) 1 button modal window that 
  //           does not block.</h4>
  //           <b>Configuration:</b>
  //           <ul>
  //               <li>Non blocking (click anywhere outside to dismiss)</li>
  //               <li>Size large</li>
  //               <li>Dismissed with default keyboard key (ESC)</li>
  //               <li>Close wth button click</li>
  //               <li>HTML content</li>
  //           </ul>`)
  //       .open();
  // }

  ngOnInit() {
    // Get the modal
    let modal = document.getElementById('myModal');

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
