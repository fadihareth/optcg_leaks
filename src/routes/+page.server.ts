import { redirect } from '@sveltejs/kit';
import { SET_IDS } from '$lib/constants';

export function load() {
	throw redirect(302, `/${SET_IDS[0]}`);
}
