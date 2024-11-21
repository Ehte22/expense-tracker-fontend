import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyExpenses, DailyExpenseStatistics, Expense, ExpenseStatistics, MonthlyExpenses } from '../models/expense';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl: string = environment.BACKEND_URL = 'expense'

  constructor(
    private http: HttpClient
  ) { }

  addExpense(expenseData: Expense): Observable<{ result: Expense, message: string }> {
    return this.http.post<{ result: Expense, message: string }>(`${this.baseUrl}/add-expense`, expenseData, {
      withCredentials: true
    })
  }

  getExpenses(
    page: number,
    limit: number,
    searchExpense: string,
    sortByOrder: string,
    filterByStatus: string): Observable<{ result: Expense[], message: string, page: number, limit: number, total: number }> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString())
      .set("searchExpense", searchExpense)
      .set("sortByOrder", sortByOrder)
      .set("filterByStatus", filterByStatus)
    return this.http.get<{ result: Expense[], message: string, page: number, limit: number, total: number }>(this.baseUrl, {
      params,
      withCredentials: true
    })
  }

  updateExpense(id: string, selectedExpense: Expense): Observable<{ result: Expense, message: string }> {
    return this.http.put<{ result: Expense, message: string }>(`${this.baseUrl}/update-expense/${id}`, selectedExpense, {
      withCredentials: true
    })
  }

  deleteExpense(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete-expense/${id}`, {
      withCredentials: true
    })
  }

  getMonthlyExpenses(searchYear: string): Observable<{ result: MonthlyExpenses[], statistics: ExpenseStatistics, message: string }> {
    const params = new HttpParams().set("searchYear", searchYear)
    return this.http.get<{ result: MonthlyExpenses[], statistics: ExpenseStatistics, message: string }>(`${this.baseUrl}/monthly-expenses`, {
      params,
      withCredentials: true
    })
  }

  getDailyExpenses(searchYear: string, searchMonth: string): Observable<{ result: DailyExpenses[], statistics: DailyExpenseStatistics, message: string }> {
    const params = new HttpParams()
      .set("searchYear", searchYear)
      .set("searchMonth", searchMonth)
    return this.http.get<{ result: DailyExpenses[], statistics: DailyExpenseStatistics, message: string }>(`${this.baseUrl}/daily-expenses`, {
      params,
      withCredentials: true
    })
  }
}
