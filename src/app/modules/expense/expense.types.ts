import type { Document, Types } from 'mongoose';

export interface IExpenseData {
	items: string;
	cost: number;
	receipt?: string;
	originalTime: string;
	createdBy: Types.ObjectId;
}

export interface IExpenseDoc extends IExpenseData, Document {
	_id: Types.ObjectId;
}
