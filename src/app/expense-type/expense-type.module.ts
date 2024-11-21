import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseTypeRoutingModule } from './expense-type-routing.module';
import { TypeListComponent } from './type-list/type-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TypeListComponent
  ],
  imports: [
    CommonModule,
    ExpenseTypeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ExpenseTypeModule { }
