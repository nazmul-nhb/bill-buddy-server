import { QueryBuilder } from '../../classes/QueryBuilder';
import { User } from '../user/user.model';
import { Meal } from './meal.model';
import type { IMealData } from './meal.types';

const createMealInDB = async (payload: IMealData, email?: string) => {
	const user = await User.validateUser(email);

	payload.user = user._id;

	const meal = await Meal.create(payload);

	return meal;
};

const getAllMealsFromDB = async (query?: Record<string, unknown>) => {
	const mealQuery = new QueryBuilder(Meal.find(), query).sort();
	// const meals = await Meal.find({});

	const meals = await mealQuery.modelQuery;

	return meals;
};

export const mealServices = { getAllMealsFromDB, createMealInDB };
