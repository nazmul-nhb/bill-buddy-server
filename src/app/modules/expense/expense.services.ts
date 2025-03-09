
import { QueryBuilder } from '../../classes/QueryBuilder';
import { Expense } from './expense.model';

const getAllExpensesFromDB = async (query?: Record<string, unknown>) => {
	const expenseQuery = new QueryBuilder(Expense.find(), query).sort();
	// const expenses = await Expense.find({});

	const expenses = await expenseQuery.modelQuery;

	return expenses;
};

export const expenseServices = { getAllExpensesFromDB };
            