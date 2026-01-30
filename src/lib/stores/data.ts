import type { CardJSON } from "$lib/models/Card";
import type { CardSetJSON } from "$lib/models/CardSet";
import { Card } from "$lib/models/Card";
import { CardSet } from "$lib/models/CardSet";
import { fetchJson } from "$lib/util";
import { baseURL } from "$lib/constants";

export async function fetchSets() {
    const sets: { "availableSets": string[] } = await fetchJson(`${baseURL}/sets.json`);
    return sets.availableSets;
}

export async function loadData(set: string) {
    const fetchedData: { "data": CardSetJSON, "cards": CardJSON[] } = await fetchJson(`${baseURL}/${set}/${set}.json`);
    return {
        "data": new CardSet(fetchedData["data"]),
        "cards": Object.fromEntries(
            fetchedData.cards.map((c) => [c.id.toLowerCase(), new Card(c)])
        )
    }
}
