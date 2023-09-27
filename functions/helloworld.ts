import LastFmApi from 'lastfm-nodejs-client';
import { error } from '@sveltejs/kit';
import type { UserResponse } from 'lastfm-nodejs-client/@types';

const handler = async (event, context) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;
	const demoData = '50';

	const getUser = async (): Promise<UserResponse> => {
		try {
			return await lastFm.getInfo(method.user.getInfo, config.username);
		} catch (err) {
			console.log(err);
			throw error(404, `User: ${config.username} not found`);
		}
	};
	let data = await getUser();
	return {
		statusCode: 200,
		body: JSON.stringify(data)
	};
};

export { handler };
