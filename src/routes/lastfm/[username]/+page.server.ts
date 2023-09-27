import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import type {
	LoveTracksResponse,
	RecentTracksResponse,
	TopAlbumsResponse,
	TopArtistsResponse,
	TopTrackResponse,
	UserResponse,
	WeeklyAlbumChartResponse,
	WeeklyArtistChartResponse,
	WeeklyChartListResponse,
	WeeklyTrackChartResponse
} from 'lastfm-nodejs-client/@types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lastFm = LastFmApi();
	const { config, method } = lastFm;
	const demoData = '50';

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

	const getTopAlbums = async (limit: string): Promise<TopAlbumsResponse> => {
		try {
			return await lastFm.getTopAlbums(method.user.getTopAlbums, config.username, 'overall', limit);
		} catch (err) {
			console.log(err);
			throw error(404, `no top tracks found not found`);
		}
	};

	const getTopTracks = async (limit: string): Promise<TopTrackResponse> => {
		try {
			return await lastFm.getTopTracks(method.user.getTopTracks, config.username, 'overall', limit);
		} catch (err) {
			console.log(err);
			throw error(404, `no top tracks found not found`);
		}
	};

	const getWeeklyAlbumChart = async (limit: string): Promise<WeeklyAlbumChartResponse> => {
		try {
			return await lastFm.getWeeklyAlbumChart(
				method.user.getWeeklyAlbumChart,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no found not found`);
		}
	};

	const getWeeklyArtistChart = async (limit: string): Promise<WeeklyArtistChartResponse> => {
		try {
			return await lastFm.getWeeklyArtistChart(
				method.user.getWeeklyArtistChart,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no weekly artist chart found not found`);
		}
	};

	const getWeekelyChartList = async (limit: string): Promise<WeeklyChartListResponse> => {
		try {
			return await lastFm.getWeeklyChartList(
				method.user.getWeeklyChartList,
				config.username,
				'overall',
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no weekly chart list found not found`);
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
			lovedTracks: await Promise.resolve(getLovedTracks(demoData)),
			recentTracks: await Promise.resolve(getRecentTracks(demoData)),
			topAlbums: await Promise.resolve(getTopAlbums(demoData)),
			topArtists: await Promise.resolve(getTopArtists(demoData)),
			topTracks: await Promise.resolve(getTopTracks(demoData)),
			user: await Promise.resolve(getUser()),
			weeklyAlbumChart: await Promise.resolve(getWeeklyAlbumChart(demoData)),
			weeklyArtistChart: await Promise.resolve(getWeeklyArtistChart(demoData)),
			weeklyChartList: await Promise.resolve(getWeekelyChartList(demoData)),
			weeklyTrackChart: await Promise.resolve(getWeeklyTrackChart(demoData))
		}
	};
};
