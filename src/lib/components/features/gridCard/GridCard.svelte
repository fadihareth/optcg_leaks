<script lang="ts">
	import type { Card, ParallelStatus } from '$lib/models/Card';
	import { Overlay } from '$lib/components';
	import { CardDetails } from '$lib/components';
	import { CacheImage } from '$lib/components';

	let {
		id,
		card,
		set,
		hideUnrevealedCards,
		showAltArts
	}: { id: string; card: Card | null; set: string; hideUnrevealedCards: boolean; showAltArts: boolean } =
		$props();

	let showOverlay = $state(false);
	let loadParallelStatus: ParallelStatus = $state('base');

	function toggleShowOverlay(parallelStatus: ParallelStatus = 'base') {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (!showOverlay) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		}
		loadParallelStatus = parallelStatus;
		showOverlay = !showOverlay;
	}
</script>

{#if card}
	<button
		onclick={() => toggleShowOverlay('base')}
		class="h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
		style="aspect-ratio: 416 / 580"
	>
		<CacheImage src={card.getImage('thumbnails', 'base', set)} alt={card.id} tags="h-full w-full rounded" />
	</button>
	{#if card.hasAltArt}
		<button
			onclick={() => toggleShowOverlay('parallel')}
			class="holo h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80 {showAltArts ? 'block' : 'hidden'}"
			style="aspect-ratio: 416 / 580"
		>
			<CacheImage src={card.getImage('thumbnails', 'parallel', set)} alt={card.id} tags="h-full w-full rounded" />
		</button>
	{/if}
	{#if card.has_manga}
		<button
			onclick={() => toggleShowOverlay('manga')}
			class="holo h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80 {showAltArts ? 'block' : 'hidden'}"
			style="aspect-ratio: 416 / 580"
		>
			<CacheImage src={card.getImage('thumbnails', 'manga', set)} alt={card.id} tags="h-full w-full rounded" />
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

{#if card}
	<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
		<CardDetails {card} {set} {toggleShowOverlay} {loadParallelStatus} />
	</Overlay>
{/if}
