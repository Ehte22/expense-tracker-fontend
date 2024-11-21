interface Tags {
    key: string,
    value: string
}

export interface Expense {
    _id?: string
    userId?: string,
    type: string,
    title: string,
    desc: string,
    amount: number,
    date: Date,
    tags: Tags[],
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null
}

export interface MonthlyExpenses {
    _id?: number,
    totalAmount: number,
    year: number,
    month: number
}
export interface DailyExpenses {
    _id?: number,
    totalAmount: number,
    year: number,
    month: number,
    date: number
}

export interface ExpenseStatistics {
    totalExpenses: number;
    averageMonthlyExpense: number;
    highestExpense: {
        month: string;
        totalAmount: number;
    };
    lowestExpense: {
        month: string;
        totalAmount: number;
    };
}

export interface DailyExpenseStatistics {
    totalExpenses: number;
    averageMonthlyExpense: number;
    dailyHighestExpense: {
        date: string;
        totalAmount: number;
    };
    dailyLowestExpense: {
        date: string;
        totalAmount: number;
    };
}

export interface ExpensesStateType {
    expenses: Expense[]
    monthlyExpneses: MonthlyExpenses[] | null,
    dailyExpneses: DailyExpenses[] | null,
    statistics: ExpenseStatistics | null;
    dailystatistics: DailyExpenseStatistics | null;
    message: string,
    error: string | null,
    loading: boolean,
    page: number,
    limit: number,
    total: number
    isDeleted: boolean,
}


