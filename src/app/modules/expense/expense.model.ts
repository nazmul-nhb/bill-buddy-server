import { Schema, model } from 'mongoose';
import type { IExpenseDoc } from './expense.types';

const expenseSchema = new Schema<IExpenseDoc>(
	{
		items: {
			type: String,
			required: true,
			trim: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		receipt: {
			type: String,
			required: false,
		},
		createdBy: {
			type: Schema.ObjectId,
			required: true,
		},
		originalTime: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const Expense = model<IExpenseDoc>('Expense', expenseSchema);
