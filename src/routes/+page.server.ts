import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type { User } from 'lastfm-nodejs-client/@types';
import type { Actions } from './$types';

export const actions = {
	default: async () => {}
} satisfies Actions;

export const load = async ({ params }) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;

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
