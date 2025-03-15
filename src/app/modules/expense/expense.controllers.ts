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

const getAllExpenses = catchAsync(async (req, res) => {
	const expenses = await expenseServices.getAllExpensesFromDB(
		req.query,
		req.user?.email,
	);

	sendResponse(res, 'Expense', 'GET', expenses);
});

const getSingleExpense = catchAsync(async (req, res) => {
	const expense = await expenseServices.getSingleExpenseFromDB(
		req.params.id,
		req.user?.email,
	);

	sendResponse(res, 'Expense', 'GET', expense);
});

const updateExpense = catchAsync(async (req, res) => {
	const expenseToUpdate = req.body as Partial<IExpenseData>;

	if (req.file) {
		const fileName = generateFileName('receipt');

		const { secure_url } = await sendImageToCloudinary(
			fileName,
			req.file.buffer,
		);

		expenseToUpdate.receipt = secure_url.split(configs.imageBaseUrl)[1];
	}

	const expense = await expenseServices.updateExpenseInDB(
		req.params.id,
		expenseToUpdate,
		req.user?.email,
	);

	sendResponse(res, 'Expense', 'GET', expense);
});

export const expenseControllers = {
	createNewExpense,
	getAllExpenses,
	getSingleExpense,
	updateExpense,
};
