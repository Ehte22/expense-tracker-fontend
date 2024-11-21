import { createAction, props } from "@ngrx/store";
import { DailyExpenses, DailyExpenseStatistics, Expense, ExpenseStatistics, MonthlyExpenses } from "../../models/expense";

export const addExpense = createAction("expense add", props<{ expenseData: Expense }>())
export const addExpenseSuccess = createAction("expense add success", props<{ expenses: Expense, message: string }>())
export const addExpenseFailure = createAction("expense add fail", props<{ error: string }>())

export const getExpenses = createAction("expenses get", props<{ page: number, limit: number, searchExpense: string, sortByOrder: string, filterByStatus: string }>())
export const getExpensesSuccess = createAction("expenses get success", props<{ expenses: Expense[], message: string, page: number, limit: number, total: number }>())
export const getExpensesFailure = createAction("expenses get fail", props<{ error: string }>())

export const updateExpense = createAction("expense update", props<{ id: string, selectedExpense: Expense }>())
export const updateExpenseSuccess = createAction("expense update success", props<{ id: string, expenses: Expense, message: string }>())
export const updateExpenseFailure = createAction("expense update fail", props<{ error: string }>())

export const deleteExpense = createAction("expense delete", props<{ id: string }>())
export const deleteExpenseSuccess = createAction("expense delete success", props<{ id: string, message: string }>())
export const deleteExpenseFailure = createAction("expense delete fail", props<{ error: string }>())

export const getMonthlyExpense = createAction("get monthly expense", props<{ searchYear: string }>())
export const getMonthlyExpenseSuccess = createAction("get monthly expense success", props<{ monthlyExpneses: MonthlyExpenses[], statistics: ExpenseStatistics, message: string }>())
export const getMonthlyExpenseFailure = createAction("get monthly expense fail", props<{ error: string }>())

export const getDailyExpense = createAction("get daily expense", props<{ searchYear: string, searchMonth: string }>())
export const getDailyExpenseSuccess = createAction("get daily expense success", props<{ dailyExpneses: DailyExpenses[], dailystatistics: DailyExpenseStatistics, message: string }>())
export const getDailyExpenseFailure = createAction("get daily expense fail", props<{ error: string }>())

