import { Component, OnInit } from '@angular/core';
import { Expense, ExpensesStateType } from '../../models/expense';
import { ActivatedRoute } from '@angular/router';
import { getExpenses } from '../../store/actions/expense.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  expenseDetail?: Expense

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<{ expense: ExpensesStateType }>
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params?.['id']

    this.store.select(state => state.expense).subscribe((data) => {
      this.expenseDetail = data.expenses.find(item => item._id === id)
      console.log(this.expenseDetail);

    })
  }

}
