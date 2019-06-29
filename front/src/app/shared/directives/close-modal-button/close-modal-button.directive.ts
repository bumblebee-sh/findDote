import { Directive, HostListener} from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Directive({
  selector: '[appCloseModalButton]',
})

export class CloseModalButtonDirective {

  constructor(
    private dialogRef: MatDialogRef<any>
  ) {

  }

  @HostListener('click') onClick() {
    this.dialogRef.close();
  }
}
