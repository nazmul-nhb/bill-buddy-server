import { Router } from 'express';
import { mealControllers } from './meal.controllers';
import authorizeUser from '../../middlewares/authorizeUser';
import validateRequest from '../../middlewares/validateRequest';
import { mealValidations } from './meal.validation';

const router = Router();

router.post(
	'/',
	authorizeUser('admin', 'user'),
	validateRequest(mealValidations.creationSchema),
	mealControllers.createNewMeal,
);

router.get('/', mealControllers.getAllMeals);

export const mealRoutes = router;
