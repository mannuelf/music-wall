import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import { defined } from '$lib/defined';
import { FANART_TV } from '$lib/fanarttv/fanarttv';
import type { Artistbackground, FanArtArtistResponse } from '$lib/fanarttv/fanarttv.types';
import type {
	Artist,
	LoveTracksResponse,
	RecentTracksResponse,
	TopAlbumsResponse,
	TopArtistsResponse,
	TopTrackResponse,
	UserResponse,
	WeeklyAlbumChartResponse,
	WeeklyArtistChartResponse,
	WeeklyTrackChartResponse
} from 'lastfm-nodejs-client/dist/@types/lastfm.types';
import type { PageServerLoad } from './$types';

let limit = '10';
let period = '7';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		limit = data.get('limit');
		period = data.get('period');
	}
};

export const load: PageServerLoad = async ({ params, fetch }) => {
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

	const getLovedTracks = async (period: string, limit: string): Promise<LoveTracksResponse> => {
		try {
			return await lastFm.getLovedTracks(
				method.user.getLovedTracks,
				config.username,
				period,
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no loved tracks found not found`);
		}
	};

	const getRecentTracks = async (period: string, limit: string): Promise<RecentTracksResponse> => {
		try {
			return await lastFm.getRecentTracks(
				method.user.getRecentTracks,
				config.username,
				period,
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no recent tracks found not found`);
		}
	};

	const getTopArtists = async (period: string, limit: string): Promise<TopArtistsResponse> => {
		try {
			return await lastFm.getTopArtists(method.user.getTopArtists, config.username, period, limit);
		} catch (err) {
			console.log(err);
			throw error(404, `no artists found not found`);
		}
	};

	const getTopAlbums = async (period: string, limit: string): Promise<TopAlbumsResponse> => {
		try {
			return await lastFm.getTopAlbums(method.user.getTopAlbums, config.username, period, limit);
		} catch (err) {
			console.log(err);
			throw error(404, `no top tracks found not found`);
		}
	};

	const getTopTracks = async (period: string, limit: string): Promise<TopTrackResponse> => {
		try {
			return await lastFm.getTopTracks(method.user.getTopTracks, config.username, period, limit);
		} catch (err) {
			console.log(err);
			throw error(404, `no top tracks found not found`);
		}
	};

	const getWeeklyAlbumChart = async (
		period: string,
		limit: string
	): Promise<WeeklyAlbumChartResponse> => {
		try {
			return await lastFm.getWeeklyAlbumChart(
				method.user.getWeeklyAlbumChart,
				config.username,
				period,
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no found not found`);
		}
	};

	const getWeeklyArtistChart = async (
		period: string,
		limit: string
	): Promise<WeeklyArtistChartResponse> => {
		try {
			return await lastFm.getWeeklyArtistChart(
				method.user.getWeeklyArtistChart,
				config.username,
				period,
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no weekly artist chart found not found`);
		}
	};

	const getWeeklyTrackChart = async (
		period: string,
		limit: string
	): Promise<WeeklyTrackChartResponse> => {
		try {
			return await lastFm.getWeeklyTrackChart(
				method.user.getWeeklyTrackChart,
				config.username,
				period,
				limit
			);
		} catch (err) {
			console.log(err);
			throw error(404, `no weekly track chart found not found`);
		}
	};

	const lovedTracks = getLovedTracks(period, limit);
	const recentTracks = getRecentTracks(period, limit);
	const topAlbums = getTopAlbums(period, limit);
	const topArtists = await getTopArtists(period, limit).then((data) => data.topartists.artist);
	const topArtistMbid: string[] = await topArtists.map((artist: Artist) => artist.mbid);
	/**
	 * Get and set data for Top Artist Grid
	 */
	const fanartTvResponses = await Promise.allSettled(
		topArtistMbid.map(async (mbId) => {
			if (!mbId) {
				return;
			}
			const res = await fetch(`${FANART_TV.base_url}${mbId}?api_key=${FANART_TV.api_key}`);

			if (res.status === 200) {
				//				console.log('🤖 res:', await res.json());
				return await res.json();
			}
			return await {
				...res.json()
			};
		})
	);
	const fanArtTvResult: FanArtArtistResponse[] = fanartTvResponses
		.map(({ value }: any) => {
			return value;
		})
		.filter(defined);

	const getTopArtistImage = (mbid: string): string => {
		if (!mbid) return '';
		let imageUrl = '';
		fanArtTvResult.find((artist) => {
			console.log('🤖 artist:', artist);
			if (artist.mbid_id === mbid) {
				artist.artistbackground?.map((artistBackground: Artistbackground) => {
					imageUrl = artistBackground.url;
				});
			}
		});
		return imageUrl;
	};

	const topArtistsWithImages = topArtists.map((artist: Artist) => {
		return {
			...artist,
			image: getTopArtistImage(artist.mbid)
		};
	});

	const topTracks = getTopTracks(period, limit);
	const user = getUser();
	const weeklyAlbumChart = getWeeklyAlbumChart(period, limit);
	const weeklyArtistChart = getWeeklyArtistChart(period, limit);
	const weeklyTrackChart = getWeeklyTrackChart(period, limit);

	//	console.log('🤖 topArtist:', topArtistsWithImages);

	return {
		streamed: {
			lovedTracks: lovedTracks,
			recentTracks: recentTracks,
			topAlbums: topAlbums,
			topArtists: topArtistsWithImages,
			topTracks: topTracks,
			user: user,
			weeklyAlbumChart: weeklyAlbumChart,
			weeklyArtistChart: weeklyArtistChart,
			weeklyTrackChart: weeklyTrackChart
		}
	};
};
