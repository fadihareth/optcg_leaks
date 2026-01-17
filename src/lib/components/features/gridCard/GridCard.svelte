<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { Overlay } from '$lib/components';
	import { CardDetails } from '$lib/components';
	import { CacheImage } from '$lib/components';

	let {
		id,
		card,
		hideUnrevealedCards
	}: { id: string; card: Card | null; hideUnrevealedCards: boolean } = $props();

	let showOverlay = $state(false);

	function toggleShowOverlay() {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (!showOverlay) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		}
		showOverlay = !showOverlay;
	}
</script>

{#if card}
	<button
		onclick={toggleShowOverlay}
		class="h-full w-full transition hover:cursor-pointer hover:brightness-80 shadow-lg"
	>
		<CacheImage src={card.thumbnail} alt={card.id} tags="h-full w-full rounded" />
	</button>
{:else if !hideUnrevealedCards}
	<p
		class="flex flex-col justify-around rounded bg-white/30 text-center text-white/60 shadow-lg"
		style="aspect-ratio: 100 / 147"
	>
		{id}
	</p>
{/if}

{#if card}
	<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
		<CardDetails {card} {toggleShowOverlay} />
	</Overlay>
{/if}
