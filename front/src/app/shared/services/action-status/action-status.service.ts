import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import { ActionStatusModalComponent } from '@app/shared/components';

enum StatusType {
  error,
  success
}

@Injectable({
  providedIn: 'root'
})
export class ActionStatusService {

  constructor(
    private dialog: MatDialog
  ) { }

  succes(text: string) {
    this.showModal(text, StatusType.success);
  }

  error(text: string) {
    this.showModal(text, StatusType.error);
  }

  private showModal(text: string, messageStatus: StatusType) {
    console.warn('showModa', messageStatus);
    this.dialog.open(ActionStatusModalComponent, {
      data: {text, messageStatus}
    });
  }
}
