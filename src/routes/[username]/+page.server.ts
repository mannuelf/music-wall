import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type {
	RecentTracksResponse,
	TopArtistsResponse,
	UserResponse
} from 'lastfm-nodejs-client/@types';
export const prerender = false;

export const load = async ({ params }) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;

	if (params.username) {
		config.username = params.username;
	}

	const getUser = async (): Promise<UserResponse> => {
		try {
			return await lastFm.getInfo(method.user.getInfo, config.username);
		} catch (err) {
			console.log(err);
			throw error(404, `User: ${config.username} not found`);
		}
	};

	const getTopArtists = async (): Promise<TopArtistsResponse> => {
		try {
			return await lastFm.getTopArtists(method.user.top_artists, config.username, 'overall', '50');
		} catch (err) {
			console.log(err);
			throw error(404, `no artists found not found`);
		}
	};

	const getRecentTracks = async (): Promise<RecentTracksResponse> => {
		try {
			return await lastFm.getRecentTracks(
				method.user.recent_tracks,
				config.username,
				'overall',
				'50'
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no recent tracks found not found`);
		}
	};
	return {
		user: getUser(),
		artists: getTopArtists(),
		recentTracks: getRecentTracks()
	};
};
