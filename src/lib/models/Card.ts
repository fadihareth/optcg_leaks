import { baseURL } from "$lib/constants";

export type CardJSON = {
    id: string;
    name: string;
    category: string;
    color: [string];
    attribute: [string];
    rarity: string;
    type: [string];
    power: number;
    effect: string;
    trigger: string;
    cost: number;
    counter: string;
    life: number;
    parallel_status: string;
    translation_credit: string;
}

export class Card {
    id: string;
    name: string;
    category: string;
    color: [string];
    attribute: [string];
    rarity: string;
    type: [string];
    power: number;

    effect: string;
    trigger: string;

    cost: number;
    counter: string;
    life: number;

    parallel_status: string;
    translation_credit: string;

    constructor(data: CardJSON) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.color = data.color;
        this.attribute = data.attribute;
        this.rarity = data.rarity;
        this.type = data.type;
        this.power = data.power;
        this.effect = data.effect;
        this.trigger = data.trigger;
        this.cost = data.cost;
        this.counter = data.counter;
        this.life = data.life;
        this.parallel_status = data.parallel_status;
        this.translation_credit = data.translation_credit;
    }

    get thumbnail(): string {
        return `${baseURL}/${this.id.split("-")[0].toLowerCase()}/thumbnails/${this.id.toLowerCase()}.png`;
    }

    get image(): string {
        return `${baseURL}/${this.id.split("-")[0].toLowerCase()}/images/${this.id.toLowerCase()}.png`;
    }
}