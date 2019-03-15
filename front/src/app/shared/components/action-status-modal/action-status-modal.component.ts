import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-action-status-modal',
  templateUrl: './action-status-modal.component.html',
  styleUrls: ['./action-status-modal.component.scss']
})
export class ActionStatusModalComponent{

  constructor(
    private dialogRef: MatDialogRef<ActionStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string, messageStatus: any}
  ) {}

}
