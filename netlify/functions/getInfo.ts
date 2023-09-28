import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type { UserResponse } from 'lastfm-nodejs-client/@types';

const handler = async () => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;

	const getUser = async (): Promise<UserResponse> => {
		try {
			return await lastFm.getInfo(method.user.getInfo, config.username);
		} catch (err) {
			console.log(err);
			throw error(404, `User: ${config.username} not found`);
		}
	};

	const data = await getUser();

	return {
		statusCode: 200,
		body: JSON.stringify(data)
	};
};

export default handler;
