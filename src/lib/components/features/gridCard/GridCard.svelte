<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { Overlay } from '$lib/components';
	import { CardDetails } from '$lib/components';
	import { CacheImage } from '$lib/components';

	let {
		id,
		card,
		hideUnrevealedCards,
		showAltArts
	}: { id: string; card: Card | null; hideUnrevealedCards: boolean; showAltArts: boolean } =
		$props();

	let showOverlay = $state(false);
	let loadAltArt = $state(false);

	function toggleShowOverlay(isAltArt: boolean = false) {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (!showOverlay) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		}
		loadAltArt = isAltArt;
		showOverlay = !showOverlay;
	}
</script>

{#if card}
	<button
		onclick={() => toggleShowOverlay(false)}
		class="h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80"
		style="aspect-ratio: 416 / 580"
	>
		<CacheImage src={card.getThumbnail(false)} alt={card.id} tags="h-full w-full rounded" />
	</button>
	{#if card.hasAltArt}
		<button
			onclick={() => toggleShowOverlay(true)}
			class="holo h-full w-full shadow-lg transition hover:cursor-pointer hover:brightness-80 {showAltArts ? 'block' : 'hidden'}"
			style="aspect-ratio: 416 / 580"
		>
			<CacheImage src={card.getThumbnail(true)} alt={card.id} tags="h-full w-full rounded" />
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
		<CardDetails {card} {toggleShowOverlay} {loadAltArt} />
	</Overlay>
{/if}
