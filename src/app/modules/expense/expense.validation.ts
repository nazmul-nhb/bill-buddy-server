import { z } from 'zod';
import { EXPENSE_TYPES, PAYMENT_TYPES } from './expense.constants';

const creationSchema = z
	.object({
		items: z.string().min(1, { message: 'Items field cannot be empty!' }),
		cost: z
			.number()
			.positive({ message: 'Cost must be a positive number!' }),
		expenseType: z.enum(EXPENSE_TYPES, {
			required_error: 'Expense type is required!',
		}),
		paymentType: z.enum(PAYMENT_TYPES, {
			required_error: 'Payment type is required!',
		}),
		originalTime: z
			.string()
			.min(1, { message: 'Original time is required!' }),
	})
	.strict();

export const expenseValidations = { creationSchema };
