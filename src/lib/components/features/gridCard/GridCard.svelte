<script lang="ts">
	import type { Card, ParallelStatus } from '$lib/models/Card';
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

	function onSelectCard(card: Card, parallelStatus: ParallelStatus) {
		card.curr_rarity = parallelStatus;
		selectCard(card);
	}
</script>

{#if card}
	<button
		onclick={() => onSelectCard(card, 'base')}
		class="h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
		style="aspect-ratio: 416 / 580"
	>
		<CacheImage
			src={card.getImage('thumbnails', 'base', set)}
			alt={card.id}
			tags="h-full w-full rounded"
		/>
	</button>
	{#if card.hasAltArt}
		<button
			onclick={() => onSelectCard(card, 'parallel')}
			class="holo h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
			class:block={showAltArts}
			class:hidden={!showAltArts}
			style="aspect-ratio: 416 / 580"
		>
			<CacheImage
				src={card.getImage('thumbnails', 'parallel', set)}
				alt={card.id}
				tags="h-full w-full rounded"
			/>
		</button>
	{/if}
	{#if card.has_manga}
		<button
			onclick={() => onSelectCard(card, 'manga')}
			class="holo h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
			class:block={showAltArts}
			class:hidden={!showAltArts}
			style="aspect-ratio: 416 / 580"
		>
			<CacheImage
				src={card.getImage('thumbnails', 'manga', set)}
				alt={card.id}
				tags="h-full w-full rounded"
			/>
		</button>
	{/if}
{:else if !hideUnrevealedCards}
	<p
		class="flex flex-col justify-around rounded bg-white/30 text-center text-white/60 shadow-lg"
		style="aspect-ratio: 416 / 580"
	>
		{id.toUpperCase()}
	</p>
{/if}
