import { Schema, model } from 'mongoose';
import type { IMealDoc } from './meal.types';
import { MEAL_NAMES } from './meal.constants';

const mealSchema = new Schema<IMealDoc>(
	{
		date: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		mealName: {
			type: String,
			enum: MEAL_NAMES,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const Meal = model<IMealDoc>('Meal', mealSchema);
