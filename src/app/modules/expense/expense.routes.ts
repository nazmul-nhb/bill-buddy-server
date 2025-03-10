import { Router } from 'express';
import authorizeUser from '../../middlewares/authorizeUser';
import validateRequest from '../../middlewares/validateRequest';
import { expenseControllers } from './expense.controllers';
import { expenseValidations } from './expense.validation';

const router = Router();

router.post(
	'/',
	authorizeUser('admin', 'user'),
	validateRequest(expenseValidations.creationSchema),
	expenseControllers.createNewExpense,
);

router.get('/', expenseControllers.getAllExpenses);

export const expenseRoutes = router;
