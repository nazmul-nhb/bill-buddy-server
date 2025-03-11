
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { mealServices } from './meal.services';
            
const getAllMeals = catchAsync(async (_req, res) => {
    const meals = await mealServices.getAllMealsFromDB();

    sendResponse(res, 'Meal', 'GET', meals);
});

export const mealControllers = { getAllMeals };
            