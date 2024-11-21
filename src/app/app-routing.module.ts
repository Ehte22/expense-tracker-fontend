import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import("./auth/auth.module").then(mod => mod.AuthModule), data: { title: "Auth" } },
  { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(mod => mod.DashboardModule), data: { title: "DashBoard" } },
  { path: "types", loadChildren: () => import("./expense-type/expense-type.module").then(mod => mod.ExpenseTypeModule), data: { title: "Expense-type" } },
  { path: "expenses", loadChildren: () => import("./expenses/expenses.module").then(mod => mod.ExpensesModule), data: { title: "Expenses" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
