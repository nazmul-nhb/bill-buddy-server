import { z } from 'zod';

const creationSchema = z
	.object({
		items: z.string().min(1, { message: 'Items field cannot be empty!' }),
		cost: z
			.number()
			.positive({ message: 'Cost must be a positive number!' }),
		originalTime: z
			.string()
			.min(1, { message: 'Original time is required!' }),
	})
	.strict();

export const expenseValidations = { creationSchema };
