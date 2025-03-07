import chalk from 'chalk';
import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import configs from './app/configs';

/**
 * * Set up socket.io.
 * @param server Instance of NodeJS Server.
 * @returns Socket io.
 */
export const setupSocket = (server: HttpServer) => {
	const io = new Server(server, {
		cors: {
			origin:
				configs.NODE_ENV === 'development' ?
					'http://localhost:5173'
				:	'https://bill-bbuddy-nhb.vercel.app',
			credentials: true,
		},
	});

	io.on('connection', (socket) => {
		console.info(chalk.yellowBright(`⚡ User Connected: ${socket.id}`));

		socket.on('new-expense', (expense: string) => {
			socket.broadcast.emit('expense-added', expense);
			console.info(expense);
		});

		socket.on('disconnect', () => {
			console.error(chalk.red(`⛔ User Disconnected: ${socket.id}`));
		});
	});

	return io;
};
