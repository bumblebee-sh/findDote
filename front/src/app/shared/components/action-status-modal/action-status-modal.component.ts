import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-action-status-modal',
  templateUrl: './action-status-modal.component.html',
  styleUrls: ['./action-status-modal.component.scss']
})
export class ActionStatusModalComponent implements OnInit{
  private delay = 2000;

  constructor(
    private dialogRef: MatDialogRef<ActionStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string, messageStatus: any}
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, this.delay);
  }
}
