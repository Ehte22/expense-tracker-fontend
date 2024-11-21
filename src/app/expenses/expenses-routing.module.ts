import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { authGuard } from '../guards/auth.guard';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: "", canActivate: [authGuard], children: [
      { path: "", component: ExpensesListComponent, title: "Expenses List" },
      { path: "create", component: CreateUpdateComponent, title: "Create Expense" },
      { path: "update/:id", component: CreateUpdateComponent, title: "Update Expense" },
      { path: "view/:id", component: ViewComponent, title: "View" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
