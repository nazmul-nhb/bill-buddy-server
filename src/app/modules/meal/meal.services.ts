
import { QueryBuilder } from '../../classes/QueryBuilder';
import { Meal } from './meal.model';

const getAllMealsFromDB = async (query?: Record<string, unknown>) => {
	const mealQuery = new QueryBuilder(Meal.find(), query).sort();
	// const meals = await Meal.find({});

	const meals = await mealQuery.modelQuery;

	return meals;
};

export const mealServices = { getAllMealsFromDB };
            