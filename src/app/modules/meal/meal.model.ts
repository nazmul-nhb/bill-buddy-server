
import { Schema, model } from 'mongoose';
import type { IMealDoc } from './meal.types';

const mealSchema = new Schema<IMealDoc>(
    {
        // Define schema here
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Meal = model<IMealDoc>('Meal', mealSchema);
            