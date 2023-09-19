import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (): Promise<Record<string, any>> => {
	return {
		welcome: `Hello world!`
	};
};
