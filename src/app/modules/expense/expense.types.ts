import type { Document, Types } from 'mongoose';

export interface IExpense {
	// Define interface
	property: 'Define types';
}

export interface IExpenseDoc extends IExpense, Document {
	_id: Types.ObjectId;
}
