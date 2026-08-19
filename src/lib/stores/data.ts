import type { CardJSON } from "$lib/models/Card.svelte";
import type { CardSetJSON } from "$lib/models/CardSet";
import { Card } from "$lib/models/Card.svelte";
import { CardSet } from "$lib/models/CardSet";
import { fetchJson } from "$lib/util";
import { baseURL } from "$lib/constants";

export async function loadData(set: string) {
    const fetchedData: {
        "data": CardSetJSON,
        "cards": CardJSON[],
        "sp_cards": CardJSON[],
        "unknown_id_cards": CardJSON[]
    } = await fetchJson(`${baseURL}/${set}/${set}.json`);
    return {
        "data": new CardSet(fetchedData["data"]),
        "cards": Object.fromEntries(
            fetchedData.cards.map((c) => [c.id.toLowerCase(), new Card(c)])
        ),
        "spCards": fetchedData.sp_cards.map((c) => new Card(c)),
        "unknownIdCards": fetchedData.unknown_id_cards.map((c) => new Card(c))
    }
}
