import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { expenseServices } from './expense.services';

const getAllExpenses = catchAsync(async (_req, res) => {
	const expenses = await expenseServices.getAllExpensesFromDB();

	sendResponse(res, 'Expense', 'GET', expenses);
});

export const expenseControllers = { getAllExpenses };
