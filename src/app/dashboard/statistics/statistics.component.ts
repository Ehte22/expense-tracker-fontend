import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExpensesStateType } from '../../models/expense';
import { getDailyExpense, getMonthlyExpense } from '../../store/actions/expense.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  selectedYear: string = ""
  view: [number, number] = [300, 300];
  expensesData: any[] = [];
  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  colorScheme = 'natural'

  constructor(
    private store: Store<{ expense: ExpensesStateType }>,
    private activeRoute: ActivatedRoute,
  ) { }

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {

    this.selectedYear = this.activeRoute.snapshot.params?.['id']
    this.getMonthlyExpenses()
    this.updateChartSize()
  }

  updateChartSize() {
    const cardElement = document.getElementById('chartCard');
    if (cardElement) {
      const width = cardElement.offsetWidth;
      const height = Math.min(width, window.innerHeight * 0.6);  // Adjust height proportionally
      this.view = [width * 0.9, height * 0.9];  // Use 90% of the card width and height
    }
  }

  getMonthlyExpenses() {
    this.store.dispatch(getMonthlyExpense({ searchYear: this.selectedYear }))
    this.store.select(state => state.expense).subscribe((data) => {
      if (data && data.monthlyExpneses) {
        // if (data.monthlyExpneses) {
        this.expensesData = data.monthlyExpneses.map(item => ({
          name: item.month,
          value: item.totalAmount
        }))
        // }
      }
    })
  }

}
