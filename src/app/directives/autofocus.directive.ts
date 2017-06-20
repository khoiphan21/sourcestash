import { Directive, Input, ElementRef, Renderer, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewChecked {

  private _autofocus;
  private count = 0;
  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngAfterViewChecked() {
    if (this._autofocus || typeof this._autofocus === "undefined") {
      // TODO: FIX THIS HACK!
      if (this.count < 10) {
        console.log('calling focus function')
        this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
        this.count++;
      }
    }
  }

  @Input() set appAutofocus(condition: boolean) {
    this._autofocus = condition != false;
  }

}
