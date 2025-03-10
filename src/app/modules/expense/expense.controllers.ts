import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { expenseServices } from './expense.services';

const createNewExpense = catchAsync(async (req, res) => {
	const expense = await expenseServices.createExpenseInDB(
		req.body,
		req?.user?.email,
	);

	sendResponse(res, 'Expense', 'POST', expense);
});

const getAllExpenses = catchAsync(async (_req, res) => {
	const expenses = await expenseServices.getAllExpensesFromDB();

	sendResponse(res, 'Expense', 'GET', expenses);
});

export const expenseControllers = { getAllExpenses, createNewExpense };
