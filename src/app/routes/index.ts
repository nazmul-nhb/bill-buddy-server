import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import type { IRoute } from '../types/interfaces';
import { expenseRoutes } from '../modules/expense/expense.routes';

const router = Router();

const routes: IRoute[] = [
	{ path: '/auth', route: authRoutes },
	{ path: '/users', route: userRoutes },
	{ path: '/expenses', route: expenseRoutes },
];

routes.forEach((item) => router.use(item.path, item.route));

export default router;
