import { error } from '@sveltejs/kit';
import LastFmApi from 'lastfm-nodejs-client';
import { defined } from '$lib/defined';
import { FANART_TV } from '$lib/fanarttv/fanarttv';
import type { Artistbackground, FanArtArtistResponse } from '$lib/fanarttv/fanarttv.types';
import { MUSICBRAINZ } from '$lib/musicbrainz/musicbrainz-cover-art';
import type { MusicBrainzCoverArt } from '$lib/musicbrainz/musicbrainz-cover-art.types';
import type {
	Album,
	Artist,
	Image as LastFmImage,
	LoveTracksResponse,
	RecentTracksResponse,
	TopAlbums,
	TopAlbumsResponse,
	TopArtistsResponse,
	TopTrackResponse,
	Track,
	UserResponse,
	WeeklyAlbum,
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

	const lovedTracks = await getLovedTracks(period, limit).then((track) => track.lovedtracks.track);
	const recentTracks = await getRecentTracks(period, limit).then(
		(tracks) => tracks.recenttracks.track
	);
	const topAlbums = await getTopAlbums(period, limit).then(
		(topAlbums) => topAlbums.topalbums.album
	);
	const theTopAlbums = topAlbums.map((album) => album);

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

	const topTracks = await getTopTracks(period, limit).then((tracks) => tracks.toptracks.track);
	const user = getUser();
	const weeklyAlbumChart = await getWeeklyAlbumChart(period, limit).then(
		(albumChart) => albumChart.weeklyalbumchart.album
	);
	const weeklyAlbums = weeklyAlbumChart.map((album: WeeklyAlbum) => album);
	const weeklyArtistChart = await getWeeklyArtistChart(period, limit).then(
		(artistChart) => artistChart.weeklyartistchart.artist
	);
	const weeklyTrackChart = await getWeeklyTrackChart(period, limit).then(
		(trackChart) => trackChart.weeklytrackchart.track
	);
	const recentTracksAlbums = weeklyTrackChart.map((track: Track) => track.album);

	const combinedAlbums = [...weeklyAlbums, ...recentTracksAlbums];

	const getAlbumCoverArt = async (albumMbId: string) => {
		try {
			const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`);
			const data = response.json();
			return data;
		} catch (error: any) {
			const errMessage = `😞 Album cover ${albumMbId} - ${error.message}`;
			throw new Error(errMessage);
		}
	};

	const musicBrainzResponse = await Promise.allSettled(
		combinedAlbums.map(async (album) => await getAlbumCoverArt(album.mbid))
	);
	const musicBrainzResult: MusicBrainzCoverArt.RootObject[] = musicBrainzResponse
		.map(({ value }: any) => {
			return value;
		})
		.filter(defined);

	const getAlbumCoverImage = (
		artistMbId: string,
		albumMbId: string,
		albumTitle?: string,
		artistName?: string
	) => {
		let imageUrl = '';
		if (albumMbId === '') return '';
		musicBrainzResult.find((album) => {
			if (album.release.includes(albumMbId)) {
				album.images
					.map((image) => {
						if (image.front) {
							return image.thumbnails;
						}
						return imageUrl;
					})
					.map((thumb) => {
						if (thumb && thumb[500]) {
							imageUrl = thumb[500].toString();
						}
						return imageUrl;
					});
			}
		});
		return imageUrl;
	};

	const weeklyAlbumChartWithImages = topAlbums.map((album: WeeklyAlbum) => {
		return {
			...album,
			image: getAlbumCoverImage(album.artist.mbid, album.mbid, album.name, album.artist['#text'])
		};
	});

	const recentTracksWithImages = recentTracks.map((track: Track) => {
		if (!track.image) return;
		const getImage = track.image.find((img: LastFmImage) => img.size === 'extralarge');
		return {
			...track,
			image: getImage ? getImage['#text'] : ''
		};
	});

	const topAlbumsWithImages = theTopAlbums.map((album: Album) => {
		if (!album.image) return;
		const getImage = album.image.find((img: LastFmImage) => img.size === 'extralarge');
		return {
			...album,
			image: getImage ? getImage['#text'] : ''
		};
	});
	//	console.log('🤖 topArtist:', topArtistsWithImages);

	return {
		streamed: {
			lovedTracks: lovedTracks,
			recentTracks: recentTracksWithImages,
			topAlbums: topAlbumsWithImages,
			topArtists: topArtistsWithImages,
			topTracks: topTracks,
			user: user,
			weeklyAlbumChart: weeklyAlbumChartWithImages,
			weeklyArtistChart: weeklyArtistChart,
			weeklyTrackChart: weeklyTrackChart
		}
	};
};
