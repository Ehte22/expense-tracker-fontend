import { Component, OnInit } from '@angular/core';
import { Expense, ExpensesStateType } from '../../models/expense';
import { Store } from '@ngrx/store';
import { deleteExpense, getExpenses } from '../../store/actions/expense.actions';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent implements OnInit {
  isDeleted: Observable<boolean> = new Observable()
  getAllExpenses: Expense[] = []
  searchExpense: string = ""
  filterByStatus: string = "all"
  currentPage: number = 1
  limit: number = 5
  total: number = 0
  pages: number[] = [];
  sortByOrder: string = "desc"

  constructor(
    private store: Store<{ expense: ExpensesStateType }>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExpenses()
    this.isDeleted = this.store.select(state => state.expense.isDeleted)
    this.isDeleted.subscribe((data) => {
      if (data) {
        this.getExpenses()
      }
    })
  }

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.type === "search") {
      this.searchExpense = input.value.toLowerCase()
    } else if (input.name === 'status') {
      this.filterByStatus = input.value.toLowerCase()
    }
    this.currentPage = 1
    this.getExpenses()
  }

  sortByDate(order: string) {
    this.sortByOrder = order;
    this.getExpenses()
  }

  getExpenses() {
    this.store.dispatch(getExpenses(
      {
        page: this.currentPage,
        limit: this.limit,
        searchExpense: this.searchExpense,
        sortByOrder: this.sortByOrder,
        filterByStatus: this.filterByStatus
      }
    ))
    this.store.select(state => state.expense).subscribe((data) => {
      this.getAllExpenses = data.expenses

      this.total = data.total
      this.currentPage = data.page
    })
  }

  deleteExpense(id: string) {
    this.store.dispatch(deleteExpense({ id }))
    this.getExpenses()
  }

  editExpense(id: string) {
    this.router.navigate([`expenses/update/${id}`])
  }

  viewExpense(id: string) {
    this.router.navigate([`expenses/view/${id}`])
  }

  onPageChange(page: number) {
    this.currentPage = page
    this.getExpenses()
  }
}

