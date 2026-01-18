import type { Card } from "$lib/models/Card";

export default function countRarities(cards: Record<string, Card>) {
	const count: Record<string, number> = {
		L: 0,
		C: 0,
		UC: 0,
		R: 0,
		SR: 0,
		SEC: 0,
	};

	for (const { rarity } of Object.values(cards)) {
		count[rarity]++;
	}

	return count;
}