import { QueryBuilder } from '../../classes/QueryBuilder';
import { User } from '../user/user.model';
import { Expense } from './expense.model';
import type { IExpenseData } from './expense.types';

const createExpenseInDB = async (payload: IExpenseData, email?: string) => {
	const user = await User.validateUser(email);

	payload.createdBy = user._id;

	const expense = await Expense.create(payload);

	return expense;
};

const getAllExpensesFromDB = async (query?: Record<string, unknown>) => {
	const expenseQuery = new QueryBuilder(Expense.find(), query).sort();
	// const expenses = await Expense.find({});

	const expenses = await expenseQuery.modelQuery;

	return expenses;
};

export const expenseServices = { getAllExpensesFromDB, createExpenseInDB };
