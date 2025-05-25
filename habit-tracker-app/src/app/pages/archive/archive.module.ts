import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { ArchiveRoutingModule } from './archive-routing.module';

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }