import { redirect } from '@sveltejs/kit';
import { SET_IDS } from '$lib/constants';

export function load({ params }) {
	const setId = (params.setId ?? '').toLowerCase();
	const isValid = SET_IDS.includes(setId as (typeof SET_IDS)[number]);

	if (!isValid) {
		throw redirect(302, `/${SET_IDS[0]}`);
	}

	return {};
}
