import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type {
	LoveTracksResponse,
	RecentTracksResponse,
	TopArtistsResponse,
	UserResponse,
	WeeklyTrackChartResponse
} from 'lastfm-nodejs-client/dist/@types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
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

	const getTopArtists = async (limit: string): Promise<TopArtistsResponse> => {
		try {
			return await lastFm.getTopArtists(
				method.user.getTopArtists,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no artists found not found`);
		}
	};

	const getRecentTracks = async (limit: string): Promise<RecentTracksResponse> => {
		try {
			return await lastFm.getRecentTracks(
				method.user.getRecentTracks,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no recent tracks found not found`);
		}
	};

	const getLovedTracks = async (limit: string): Promise<LoveTracksResponse> => {
		try {
			return await lastFm.getLovedTracks(
				method.user.getLovedTracks,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no loved tracks found not found`);
		}
	};

	const getWeeklyTrackChart = async (limit: string): Promise<WeeklyTrackChartResponse> => {
		try {
			return await lastFm.getWeeklyTrackChart(
				method.user.getWeeklyTrackChart,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no weekly track chart found not found`);
		}
	};

	return {
		streamed: {
			artists: await Promise.resolve(getTopArtists('10')),
			lovedTracks: await Promise.resolve(getLovedTracks('10')),
			recentTracks: await Promise.resolve(getRecentTracks('10')),
			topAlbums: [],
			topArtists: [],
			topTracks: [],
			user: await Promise.resolve(getUser()),
			weeklyAlbumChart: await Promise.resolve(),
			weeklyArtistChart: await Promise.resolve(),
			weeklyChartList: await Promise.resolve(),
			weeklyTrackChart: await Promise.resolve(getWeeklyTrackChart('10'))
		}
	};
};
