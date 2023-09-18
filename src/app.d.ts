// See https://kit.svelte.dev/docs/types#app

import type { AuthResponse, User } from 'lastfm-nodejs-client/@types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			auth: AuthResponse;
			user: User;
		}
		// interface Platform {}
	}
}

export {};
