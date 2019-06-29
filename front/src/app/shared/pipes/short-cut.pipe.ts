import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCut'
})

export class ShortCutPipe implements PipeTransform {

  private regRex: RegExp = /\w/;

  transform(value: any, range?: any): any {
    let text = value;
    if(value && value.length > range) {
      text = this.cropText(value, range);
    }
    return text;
  }

  private cropText(text: string, index: number): string {
    let _t = text.slice(0, text.lastIndexOf(' ', index));
    if(this.isValid(_t)) {
      _t = _t.slice(0, _t.lastIndexOf(`${this.regRex}`));
    }
    return _t + '...';
  }

  private isValid(symbol: string): boolean{
    return this.regRex.test(symbol);
  }
}
