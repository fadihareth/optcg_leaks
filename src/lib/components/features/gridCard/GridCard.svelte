<script lang="ts">
	import type { Card, imageData } from '$lib/models/Card.svelte';
    import { baseURL } from "$lib/constants";
	import { CacheImage } from '$lib/components';

	let {
		id,
		card,
		set,
		selectCard,
		hideUnrevealedCards,
		showAltArts
	}: {
		id: string;
		card: Card | null;
		set: string;
		selectCard: (c: Card) => void;
		hideUnrevealedCards: boolean;
		showAltArts: boolean;
	} = $props();

	function onSelectCard(card: Card, imageData: imageData) {
		card.curr_rarity = imageData;
		selectCard(card);
	}
</script>

{#if card}
    {#each card.images as image, i}
        <button
            onclick={() => onSelectCard(card, image)}
            class="h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
            class:holo={image.name !== "Base Art"}
            class:block={showAltArts || i > 0}
			class:hidden={!showAltArts && i > 0}
            style="aspect-ratio: 416 / 580"
        >
            <CacheImage
                src={`${baseURL}/${set}/thumbnails/${image.id}.webp`}
                alt={card.id}
                tags="h-full w-full rounded"
            />
        </button>
    {/each}
{:else if !hideUnrevealedCards}
	<p
		class="flex flex-col justify-around rounded bg-white/30 text-center text-white/60 shadow-lg"
		style="aspect-ratio: 416 / 580"
	>
		{id.toUpperCase()}
	</p>
{/if}
