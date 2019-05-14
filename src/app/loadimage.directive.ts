import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[appLoadimage]'
})
export class LoadimageDirective {

  ref: string;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.ref = this.el.nativeElement.src;
    fromEvent(this.el.nativeElement, 'load')
      .pipe(first())
      .subscribe(() => this.setImage())

    this.setPlaceholder();

  }

  private setPlaceholder() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src', `https://via.placeholder.com/50x50`
    )
  }


  private setImage() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src', this.ref
    )
  }

}
