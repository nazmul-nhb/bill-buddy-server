import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { QueryBuilder } from '../../classes/QueryBuilder';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import { Expense } from './expense.model';
import type { IExpenseData } from './expense.types';

const createExpenseInDB = async (payload: IExpenseData, email?: string) => {
	const user = await User.validateUser(email);

	payload.createdBy = user._id;

	const expense = await Expense.create(payload);

	return expense;
};

const getAllExpensesFromDB = async (
	query?: Record<string, unknown>,
	email?: string,
) => {
	const user = await User.validateUser(email);

	const expenseQuery = new QueryBuilder(
		Expense.find(user.role === 'user' ? { createdBy: user._id } : {}),
		query,
	).sort();

	const expenses = await expenseQuery.modelQuery;

	return expenses;
};

const getSingleExpenseFromDB = async (id: string, email?: string) => {
	const user = await User.validateUser(email);

	const expense = await Expense.findOne({ _id: id });

	if (!expense) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No expense found with id: ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'get_expense',
		);
	}

	if (user._id.toString() !== expense?.createdBy.toString()) {
		throw new ErrorWithStatus(
			'Unauthorized Error',
			`You cannot access expense with id: ${id}!`,
			STATUS_CODES.FORBIDDEN,
			'get_expense',
		);
	}

	return expense;
};

const updateExpenseInDB = async (
	id: string,
	payload: Partial<IExpenseData>,
	email?: string,
) => {
	const user = await User.validateUser(email);

	const existingExpense = await Expense.findById(id);

	if (!existingExpense) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`Expense with id: ${id} not found!`,
			STATUS_CODES.NOT_FOUND,
			'update_expense',
		);
	}

	if (existingExpense.createdBy.toString() !== user._id.toString()) {
		throw new ErrorWithStatus(
			'Unauthorized Error',
			'You do not have permission to update this expense!',
			STATUS_CODES.FORBIDDEN,
			'update_expense',
		);
	}

	const updateOptions = [
		{ _id: id },
		payload,
		{ new: true, rawResult: true },
	];

	const updatedExpense = await Expense.findOneAndUpdate(...updateOptions);

	if (!updatedExpense) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`Cannot update specified expense with id: ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'update_expense',
		);
	}

	return updatedExpense;
};

export const expenseServices = {
	getAllExpensesFromDB,
	createExpenseInDB,
	getSingleExpenseFromDB,
	updateExpenseInDB,
};
