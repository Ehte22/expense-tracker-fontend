import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExpensesStateType, MonthlyExpenses } from '../../models/expense';
import { getDailyExpense, getExpenses, getMonthlyExpense } from '../../store/actions/expense.actions';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  years: string[] = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"]
  searchExpense: string = ""
  currentPage: number = 1
  limit: number = 5
  total: number = 0
  pages: number[] = [];
  sortByOrder: string = "desc"

  monthId: string = ""
  selctedMonth!: string
  selectedYear: string = new Date().getFullYear().toString();
  monthlyExpenses: MonthlyExpenses[] = []


  constructor(
    private store: Store<{ expense: ExpensesStateType }>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMonthlyExpenses()
  }

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.selectedYear = input.value.toLowerCase()
    this.getMonthlyExpenses()
  }

  getMonthlyExpenses() {
    this.store.dispatch(getMonthlyExpense({ searchYear: this.selectedYear }))
    this.store.select(state => state.expense).subscribe((data) => {
      if (data && data.monthlyExpneses) {
        this.monthlyExpenses = data.monthlyExpneses
      }
    })
  }

  monthlyStatistics() {
    this.router.navigate([`dashboard/statistics/${this.selectedYear}`])
  }

  expense(id: number) {
    this.router.navigate([`dashboard/daily/${id}`])
  }
}
