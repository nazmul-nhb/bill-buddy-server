import configs from '../configs';
import catchAsync from '../utilities/catchAsync';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../utilities/authUtilities';
import { STATUS_CODES } from '../constants';
import type { TUserRole } from '../types';

/**
 * * Middleware to check if the user is authorized to access the route.
 * @param requiredRoles User role/roles (comma separated) required to access the route.
 */
const authorizeUser = (...requiredRoles: TUserRole[]) => {
	return catchAsync(async (req, _res, next) => {
		const token = req.headers.authorization?.split(' ')[1];

		// * Verify and decode token
		const decoded = verifyToken(configs.accessSecret, token);

		// * Validate and extract user from DB
		const user = await User.validateUser(decoded.email);

		if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
			throw new ErrorWithStatus(
				'Authorization Error',
				"You're not authorized!",
				STATUS_CODES.UNAUTHORIZED,
				'auth',
			);
		}

		req.user = decoded;

		next();
	});
};

export default authorizeUser;
