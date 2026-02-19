import { baseURL } from "$lib/constants";

export type ParallelStatus = 'base' | 'parallel' | 'manga';

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
    has_manga?: boolean;
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
    has_manga: boolean;
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
        this.has_manga = data.has_manga ?? false;
        this.translation_credit = data.translation_credit;
    }

    get hasAltArt(): boolean {
        return this.parallel_status !== "Base";
    }

    getImage(type: 'thumbnails' | 'images', parallel_status: ParallelStatus, set: string): string {
        const cardId = this.id.toLowerCase();
        const extension = {
            base: '',
            parallel: 'a',
            manga: 'sp'
        }[parallel_status];
        return `${baseURL}/${set}/${type}/${cardId}${extension}.webp`;
    }
}