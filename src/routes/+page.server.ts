import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type { User } from 'lastfm-nodejs-client/@types';

export const load = async ({ url }) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;
	const username = url.searchParams.get('q');
	if (username) {
		config.username = username;
	}

	const getUser = async (): Promise<User> => {
		const { user } = await lastFm.getInfo(method.user.getInfo, config.username, 'overall', '');
		return user;
	};

	if (!getUser()) {
		throw error(404, 'User not found');
	}

	return {
		user: await getUser()
	};
};
