import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpenseService } from "../../services/expense.service";
import { addExpense, addExpenseFailure, addExpenseSuccess, deleteExpense, deleteExpenseFailure, deleteExpenseSuccess, getDailyExpense, getDailyExpenseFailure, getDailyExpenseSuccess, getExpenses, getExpensesFailure, getExpensesSuccess, getMonthlyExpense, getMonthlyExpenseFailure, getMonthlyExpenseSuccess, updateExpense, updateExpenseFailure, updateExpenseSuccess } from "../actions/expense.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../../services/toast.service";


@Injectable()
export class ExpenseEffect {
    constructor(
        private $action: Actions,
        private expenseService: ExpenseService,
        private toast: ToastService,
        private router: Router
    ) { }

    _addExpense = createEffect(() =>
        this.$action.pipe(
            ofType(addExpense),
            mergeMap(({ expenseData }) => {
                return this.expenseService.addExpense(expenseData).pipe(
                    map(({ result, message }) => {
                        this.toast.showSuccess(message)
                        this.router.navigate(['expenses'])
                        return addExpenseSuccess({ expenses: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(addExpenseFailure(error))
                    })
                )
            })
        )
    )

    _getExpenses = createEffect(() =>
        this.$action.pipe(
            ofType(getExpenses),
            mergeMap(({ page, limit, searchExpense, sortByOrder, filterByStatus }) => {
                return this.expenseService.getExpenses(page, limit, searchExpense, sortByOrder, filterByStatus).pipe(
                    map(({ result, message, page, limit, total }) => {
                        return getExpensesSuccess({ expenses: result, message, page, limit, total })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(getExpensesFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _updateExpenses = createEffect(() =>
        this.$action.pipe(
            ofType(updateExpense),
            mergeMap(({ id, selectedExpense }) => {
                return this.expenseService.updateExpense(id, selectedExpense).pipe(
                    map(({ result, message }) => {
                        this.toast.showSuccess(message)
                        this.router.navigate(['expenses'])
                        return updateExpenseSuccess({ id, expenses: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(updateExpenseFailure({ error: error.message }))
                    })
                )
            })
        )
    )
    _deleteExpenses = createEffect(() =>
        this.$action.pipe(
            ofType(deleteExpense),
            mergeMap(({ id }) => {
                return this.expenseService.deleteExpense(id).pipe(
                    map(({ message }) => {
                        this.toast.showSuccess(message)
                        return deleteExpenseSuccess({ id, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(deleteExpenseFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _getMonthlyExpenses = createEffect(() =>
        this.$action.pipe(
            ofType(getMonthlyExpense),
            mergeMap(({ searchYear }) => {
                return this.expenseService.getMonthlyExpenses(searchYear).pipe(
                    map(({ result, message, statistics }) => {
                        return getMonthlyExpenseSuccess({ monthlyExpneses: result, message, statistics })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(getMonthlyExpenseFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _dailyMonthlyExpenses = createEffect(() =>
        this.$action.pipe(
            ofType(getDailyExpense),
            mergeMap(({ searchYear, searchMonth }) => {
                return this.expenseService.getDailyExpenses(searchYear, searchMonth).pipe(
                    map(({ result, message, statistics }) => {
                        return getDailyExpenseSuccess({ dailyExpneses: result, message, dailystatistics: statistics })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(getDailyExpenseFailure({ error: error.message }))
                    })
                )
            })
        )
    )
}