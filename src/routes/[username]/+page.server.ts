import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type { User } from 'lastfm-nodejs-client/@types';
export const prerender = false;

export const load = async ({ params }) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;

	if (params.username) {
		config.username = params.username;
	}

	const getUser = async (): Promise<User> => {
		try {
			const { user } = await lastFm.getInfo(method.user.getInfo, config.username);
			return user;
		} catch (err) {
			throw error(404, `User: ${config.username} not found`);
		}
	};

	return {
		user: getUser()
	};
};
