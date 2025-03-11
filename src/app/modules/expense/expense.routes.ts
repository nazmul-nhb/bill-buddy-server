import { Router } from 'express';
import authorizeUser from '../../middlewares/authorizeUser';
import { parsePrimitives } from '../../middlewares/parsePrimitives';
import validateRequest from '../../middlewares/validateRequest';
import { uploadFile } from '../../utilities/uploadImage';
import { expenseControllers } from './expense.controllers';
import { expenseValidations } from './expense.validation';

const router = Router();

router.post(
	'/',
	authorizeUser('admin', 'user'),
	uploadFile.single('receipt'),
	parsePrimitives,
	validateRequest(expenseValidations.creationSchema),
	expenseControllers.createNewExpense,
);

router.get('/', expenseControllers.getAllExpenses);

export const expenseRoutes = router;
