import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ExpensesListComponent,
    CreateUpdateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ExpensesModule { }
