import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[defaultImage]',
  host: {
    '(error)': 'updateSrc()',
    '[src]': 'src',
  }
})
export class DefaultImageDirective {
  @Input('src') src: string;
  @Input('loadDefaultImage') type: string;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  updateSrc() {
    this.renderer.setProperty(this.elRef.nativeElement, 'src',  '/assets/no_image.png');
  }

}
