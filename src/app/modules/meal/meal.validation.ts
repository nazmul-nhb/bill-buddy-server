import { z } from 'zod';
import { MEAL_NAMES } from './meal.constants';

const creationSchema = z
	.object({
		date: z.string().min(1, { message: 'Meal date is required!' }),
		quantity: z
			.number()
			.positive({ message: 'Meal quantity must be a positive number!' }),
		mealName: z.enum(MEAL_NAMES, {
			required_error: 'Meal name is required!',
		}),
	})
	.strict();

export const mealValidations = { creationSchema };
