import { Component, OnInit, forwardRef, Input, ElementRef, ViewChild} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileLoaderComponent),
  multi: true
};

enum FileType {
  base64
}

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
  providers: [VALUE_ACCESSOR]
})

export class FileLoaderComponent implements ControlValueAccessor {
  @ViewChild('type', {static : false}) type: FileType;
  @ViewChild('file', {static : false}) fileFiled: ElementRef;
  @Input('accept') accept: string;

  text: string;
  changeValue: (x?: any) => void;

  registerOnChange(fn: () => void) {
    this.changeValue = fn;
  }
  writeValue(value: any) {}
  registerOnTouched(fn: any) {}

  fileLoader(file: File) {
    this.text = file.name;
    if (this.type === FileType.base64) {
      const reader = new FileReader();
      reader.onload = e => {
        this.changeValue(e.target['result']);
      };
      reader.readAsDataURL(file);
      return;
    }
    this.changeValue(file);
  }

  clearFile() {
    this.fileFiled.nativeElement.value = null;
    this.text = null;
    this.changeValue(null);
  }
}
