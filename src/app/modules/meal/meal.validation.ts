
import { z } from 'zod';

const creationSchema = z
	.object({})
	.strict();

export const mealValidations = { creationSchema };
            