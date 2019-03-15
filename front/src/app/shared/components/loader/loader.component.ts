import { Component, OnDestroy, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements AfterContentInit, OnDestroy {
  animationTime: number = 600;
  active: boolean = false;
  timer: any;

  constructor() { }

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
