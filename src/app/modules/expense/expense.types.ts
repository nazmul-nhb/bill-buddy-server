import type { Document, Types } from 'mongoose';
import type { EXPENSE_TYPES, PAYMENT_TYPES } from './expense.constants';

export interface IExpenseData {
	items: string;
	expenseType: (typeof EXPENSE_TYPES)[number];
	paymentType: (typeof PAYMENT_TYPES)[number];
	cost: number;
	receipt?: string;
	originalTime: string;
	createdBy: Types.ObjectId;
}

export interface IExpenseDoc extends IExpenseData, Document {
	_id: Types.ObjectId;
}
