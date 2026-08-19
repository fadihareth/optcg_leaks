import { baseURL } from "$lib/constants";

export type imageData = {
    name: string;
    id: string;
}

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
    images: [imageData];
    translation_credit: string;
}

export class Card {
    readonly id: string;
    readonly name: string;
    readonly category: string;
    readonly color: [string];
    readonly attribute: [string];
    readonly rarity: string;
    readonly type: [string];
    readonly power: number;

    readonly effect: string;
    readonly trigger: string;

    readonly cost: number;
    readonly counter: string;
    readonly life: number;
    readonly images: [imageData];

    readonly translation_credit: string;

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
        this.images = data.images;
        this.translation_credit = data.translation_credit;
        this.curr_rarity = data.images[0];
    }

    curr_rarity = $state<imageData>({ name: "", id: "" });
}
