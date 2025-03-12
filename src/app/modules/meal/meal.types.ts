import type { Document, Types } from 'mongoose';
import type { MEAL_NAMES } from './meal.constants';

export interface IMealData {
	date: string;
	quantity: number;
	mealName: (typeof MEAL_NAMES)[number];
	user: Types.ObjectId;
}

export interface IMealDoc extends IMealData, Document {
	_id: Types.ObjectId;
}
