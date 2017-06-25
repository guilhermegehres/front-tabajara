import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MaterialModule,
  MdButtonModule, 
  MdCheckboxModule, 
  MdInputModule, 
  MdGridListModule,
  MdCardModule,
  MdToolbarModule,
  MdListModule,
  MdTabsModule,
  MdProgressBarModule,
  MdDatepickerModule
  
} from '@angular/material';

@NgModule({
  imports: [ 
    CommonModule,
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule, 
    MdInputModule, 
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdListModule,
    MdTabsModule,
    MdProgressBarModule,
    MaterialModule,
    MdDatepickerModule
  ],
  exports : [ 
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule, 
    MdInputModule, 
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdListModule,
    MdTabsModule,
    MdProgressBarModule,
    MaterialModule,
    MdDatepickerModule
  ],
  declarations: []
})
export class MaterialImportsModule { }
