import { Component, OnDestroy, AfterContentInit, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements AfterContentInit, OnDestroy, OnInit {
  @Input() backgroundColor = '#fff';

  private animationTime = 600;
  private active = false;
  private timer: any;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.renderer.addClass((this.elRef.nativeElement as HTMLElement ).parentElement, 'relative');
  }
  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  ngAfterContentInit() {
    const timer = () => {
      this.timer = setTimeout(() => {
        this.active = !this.active;
        timer();
      }, this.animationTime);
    };
    timer();
  }
}
