<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { Overlay } from '$lib/components';
	import { CardDetails } from '$lib/components';
	import { CacheImage } from '$lib/components';

	let { id, card }: { id: string; card: Card | null } = $props();

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

<div class="shadow-md">
	{#if card}
		<button onclick={toggleShowOverlay} class="transition hover:cursor-pointer hover:brightness-80">
			<CacheImage src={card.thumbnail} alt={card.id} tags="h-full w-full rounded object-contain" />
		</button>
	{:else}
		<p
			class="flex flex-col justify-around rounded bg-white/30 text-center text-white/60"
			style="aspect-ratio: 101 / 141"
		>
			{id}
		</p>
	{/if}
</div>

{#if card}
	<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
		<CardDetails {card} {toggleShowOverlay} />
	</Overlay>
{/if}
