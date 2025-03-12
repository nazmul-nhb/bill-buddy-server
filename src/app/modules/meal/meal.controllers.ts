import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { mealServices } from './meal.services';
import type { IMealData } from './meal.types';

const createNewMeal = catchAsync(async (req, res) => {
	const meal = await mealServices.createMealInDB(
		req.body as IMealData,
		req?.user?.email,
	);

	sendResponse(res, 'Meal', 'POST', meal);
});

const getAllMeals = catchAsync(async (_req, res) => {
	const meals = await mealServices.getAllMealsFromDB();

	sendResponse(res, 'Meal', 'GET', meals);
});

export const mealControllers = { createNewMeal, getAllMeals };
