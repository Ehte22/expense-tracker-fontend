import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTypeModule } from './expense-type.module';
import { TypeListComponent } from './type-list/type-list.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: "", canActivate: [authGuard], component: TypeListComponent, title: "Type" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseTypeRoutingModule { }
