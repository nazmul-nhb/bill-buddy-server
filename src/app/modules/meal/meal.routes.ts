
import { Router } from 'express';
import { mealControllers } from './meal.controllers';

const router = Router();

router.get('/', mealControllers.getAllMeals);

export const mealRoutes = router;
            