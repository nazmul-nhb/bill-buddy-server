import configs from '../../configs';
import catchAsync from '../../utilities/catchAsync';
import { generateFileName } from '../../utilities/generateFileName';
import sendResponse from '../../utilities/sendResponse';
import { sendImageToCloudinary } from '../../utilities/uploadImage';
import { expenseServices } from './expense.services';
import type { IExpenseData } from './expense.types';

const createNewExpense = catchAsync(async (req, res) => {
	const expenseToCreate = req.body as IExpenseData;

	if (req.file) {
		const fileName = generateFileName('receipt');

		const { secure_url } = await sendImageToCloudinary(
			fileName,
			req.file.buffer,
		);

		expenseToCreate.receipt = secure_url.split(configs.imageBaseUrl)[1];
	}

	const expense = await expenseServices.createExpenseInDB(
		expenseToCreate,
		req?.user?.email,
	);

	sendResponse(res, 'Expense', 'POST', expense);
});

const getAllExpenses = catchAsync(async (_req, res) => {
	const expenses = await expenseServices.getAllExpensesFromDB();

	sendResponse(res, 'Expense', 'GET', expenses);
});

export const expenseControllers = { getAllExpenses, createNewExpense };
