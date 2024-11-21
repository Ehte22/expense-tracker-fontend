import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../components/pagination/pagination.component';



@NgModule({
  declarations: [HeaderComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
