import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatInputModule, MatDialogModule, MatCardModule, MatSelectModule} from '@angular/material';

const MODULES = [MatButtonModule, MatCheckboxModule, MatInputModule, MatDialogModule, MatCardModule, MatSelectModule];

@NgModule({
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    ...MODULES
  ],
  declarations: []
})
export class MaterialModule { }
