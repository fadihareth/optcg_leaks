export type CardSetJSON = {
    id: string;
    name: string;
    description: string;
    japan_release: string;
    global_release: string;
    rarities: Record<string, number>;
}

export class CardSet {
    id: string;
    name: string;
    description: string;
    japan_release: string;
    global_release: string;
    rarities: Record<string, number>;

    constructor(data: CardSetJSON) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.japan_release = data.japan_release;
        this.global_release = data.global_release;
        this.rarities = data.rarities;
    }

    get cardCount(): number {
        return this.rarities["leader"] + this.rarities["common"] + this.rarities["uncommon"] + this.rarities["rare"] + this.rarities["super_rare"] + this.rarities["secret_rare"];
    }
}