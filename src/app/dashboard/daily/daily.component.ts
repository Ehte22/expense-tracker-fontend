import { Component, HostListener, OnInit } from '@angular/core';
import { DailyExpenses, ExpensesStateType } from '../../models/expense';
import { Store } from '@ngrx/store';
import { getDailyExpense } from '../../store/actions/expense.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css'
})
export class DailyComponent implements OnInit {
  selectedYear: string = new Date().getFullYear().toString();
  selectedMonth: string = ""

  view: [number, number] = [300, 300];
  expensesData: any[] = [];
  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  colorScheme = 'natural'

  day?: DailyExpenses

  constructor(
    private store: Store<{ expense: ExpensesStateType }>,
    private acitveRoute: ActivatedRoute
  ) { }

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.selectedMonth = this.acitveRoute.snapshot.params?.['id']
    this.store.select(state => state.expense).subscribe((data) => {

      if (data && data.dailyExpneses) {
        this.day = data.dailyExpneses.find(item => item._id === +this.selectedMonth)
        console.log(this.day);

      }
    })
    this.getDailyExpenses()
    this.updateChartSize();
  }

  updateChartSize() {
    const cardElement = document.getElementById('chartCard');
    if (cardElement) {
      const width = cardElement.offsetWidth;
      const height = Math.min(width, window.innerHeight * 0.6);  // Adjust height proportionally
      this.view = [width * 0.9, height * 0.9];  // Use 90% of the card width and height
    }
  }


  getDailyExpenses() {
    this.store.dispatch(getDailyExpense({ searchYear: this.selectedYear, searchMonth: this.selectedMonth }))
    this.store.select(state => state.expense).subscribe((data) => {
      if (data && data.dailyExpneses) {
        this.expensesData = data.dailyExpneses.map(item => ({
          name: item.date,
          value: item.totalAmount
        }))
      }
    })
  }
}
