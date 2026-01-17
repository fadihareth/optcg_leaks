import type { Card } from "$lib/models/Card";

const rarityMap = {
    L: "leader",
    C: "common",
    UC: "uncommon",
    R: "rare",
    SR: "super_rare",
    SEC: "secret_rare",
} as const;

type RarityCode = keyof typeof rarityMap;

export default function countRarities(cards: Record<string, Card>) {
    const count = {
        "leader": 0,
        "common": 0,
        "uncommon": 0,
        "rare": 0,
        "super_rare": 0,
        "secret_rare": 0
    };

    for (const card of Object.values(cards)) {
        count[rarityMap[card.rarity as RarityCode]]++;
    }

    return count;
}