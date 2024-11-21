import { createReducer, on } from "@ngrx/store";
import { ExpensesStateType } from "../../models/expense";
import { addExpense, addExpenseFailure, addExpenseSuccess, deleteExpense, deleteExpenseFailure, deleteExpenseSuccess, getDailyExpense, getDailyExpenseFailure, getDailyExpenseSuccess, getExpenses, getExpensesFailure, getExpensesSuccess, getMonthlyExpense, getMonthlyExpenseFailure, getMonthlyExpenseSuccess, updateExpense, updateExpenseFailure, updateExpenseSuccess } from "../actions/expense.actions";

const initialState: ExpensesStateType = { expenses: [], message: "", error: null, loading: false, page: 1, limit: 5, total: 0, monthlyExpneses: null, dailyExpneses: null, statistics: null, dailystatistics: null, isDeleted: false, }

export const expenseReducer = createReducer(
    initialState,
    on(addExpense, (state, action) => {
        return { ...state, loading: true }
    }),
    on(addExpenseSuccess, (state, { expenses, message }) => {
        return { ...state, expenses: [...state.expenses], message, loading: false, }
    }),
    on(addExpenseFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(getExpenses, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getExpensesSuccess, (state, { expenses, message, page, limit, total, }) => {
        return { ...state, expenses, page, limit, total, message, loading: false, isDeleted: false }
    }),
    on(getExpensesFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(updateExpense, (state, action) => {
        return { ...state, loading: true }
    }),
    on(updateExpenseSuccess, (state, { id, expenses, message }) => {
        const x = state.expenses.map(item => item._id === id ? expenses : item)
        return { ...state, expenses: x, message, loading: false }
    }),
    on(updateExpenseFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(deleteExpense, (state, action) => {
        return { ...state, loading: true }
    }),
    on(deleteExpenseSuccess, (state, { id, message }) => {
        const x = state.expenses.filter(item => item._id !== id)
        return { ...state, expenses: x, message, loading: false, isDeleted: true }
    }),
    on(deleteExpenseFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(getMonthlyExpense, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getMonthlyExpenseSuccess, (state, { monthlyExpneses, statistics, message }) => {
        return { ...state, monthlyExpneses, statistics, message, loading: false }
    }),
    on(getMonthlyExpenseFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(getDailyExpense, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getDailyExpenseSuccess, (state, { dailyExpneses, dailystatistics, message }) => {
        return { ...state, dailyExpneses, dailystatistics, message, loading: false }
    }),
    on(getDailyExpenseFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

)