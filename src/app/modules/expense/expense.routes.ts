
import { Router } from 'express';
import { expenseControllers } from './expense.controllers';

const router = Router();

router.get('/', expenseControllers.getAllExpenses);

export const expenseRoutes = router;
            