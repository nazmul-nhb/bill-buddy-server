import { Schema, model } from 'mongoose';
import type { IExpenseDoc } from './expense.types';

const expenseSchema = new Schema<IExpenseDoc>(
	{
		// Define schema here
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const Expense = model<IExpenseDoc>('Expense', expenseSchema);
