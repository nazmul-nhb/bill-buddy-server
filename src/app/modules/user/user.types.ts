import type { Document, Model, Types } from 'mongoose';
import type { TUserRole } from '../../types';

export interface IUser {
	name: string;
	email: string;
	password: string;
	image: string;
	role: TUserRole;
	isActive?: boolean;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface ITokens {
	accessToken: string;
	refreshToken: string;
	user: ICurrentUser;
}

export interface IUserDoc extends IUser, Document {
	_id: Types.ObjectId;
}

export interface IUserModel extends Model<IUserDoc> {
	validateUser(email?: string): Promise<IUserDoc>;
}

export interface ICurrentUser extends Omit<IUser, 'password'> {
	_id: Types.ObjectId;
	createdAt: string;
	updatedAt: string;
}
