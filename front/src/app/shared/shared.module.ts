import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CloseModalButtonDirective } from './directives';
import {
  ShortCutPipe
} from './pipes';
import { ActionStatusModalComponent, MapComponent, FileLoaderComponent, LoaderComponent } from './components';
import { MaterialModule} from './modules';

const FEATURES = [
  CloseModalButtonDirective,
  ShortCutPipe,
  MapComponent,
  FileLoaderComponent,
  LoaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ...FEATURES,
    ShortCutPipe,
    ActionStatusModalComponent
  ],
  exports: [
    ...FEATURES,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ActionStatusModalComponent
  ]
})
export class SharedModule { }
