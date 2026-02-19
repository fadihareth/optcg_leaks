<script lang="ts">
	import type { Card, ParallelStatus } from '$lib/models/Card';
	import { CacheImage } from '$lib/components/ui';
	import { highlightEffects } from '$lib/util';
	import X from '@tabler/icons-svelte/icons/x';
	import Toggle from 'svelte-toggle';

	let {
		card,
		set,
		toggleShowOverlay,
		loadParallelStatus
	}: { card: Card; set: string; toggleShowOverlay: () => void; loadParallelStatus: ParallelStatus } = $props();

	let parallelStatus: ParallelStatus = $derived(loadParallelStatus);

	function toggleShowAltArt() {
		parallelStatus = parallelStatus === "parallel" ? "base" : "parallel";
	}
	function toggleShowMangaArt() {
		parallelStatus = parallelStatus === "manga" ? "base" : "manga";
	}
</script>

<div
	class="relative flex h-3/4 gap-6 bg-theme p-4 shadow-lg max-md:h-full max-md:w-full max-md:flex-col max-md:items-center max-md:overflow-y-scroll md:rounded-2xl xl:w-3/4"
>
	<button
		onclick={toggleShowOverlay}
		class="absolute top-4 right-4 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:bg-white/10"
	>
		<X />
	</button>
	<CacheImage
		src={card.getImage('images', parallelStatus, set)}
		alt={card.id}
		tags="md:h-full max-md:w-full rounded-2xl object-contain max-md:mt-10"
		style="aspect-ratio: 416 / 580"
	/>
	<div class="flex flex-col items-start gap-4 md:pt-4 max-md:w-full">
		<div class="flex flex-col items-start">
			<p class="text-left text-4xl font-semibold md:pr-12">{card.name}</p>
			<p class="text-md pb-1 text-left text-white/70">{card.type.join(' / ')}</p>
			<div class="flex flex-wrap gap-2">
				<p class="tag">{card.id}</p>
				<p class="tag">{card.color.join(' / ')}</p>
				{#if card.attribute.length > 0}
					<p class="tag">{card.attribute.join(' / ')}</p>
				{:else}
					<p class="tag">{card.category}</p>
				{/if}
				<p class="tag">{card.rarity}</p>
			</div>
		</div>
		{#if card.effect !== ''}
			<div class="flex flex-col items-start">
				<p class="text-xl font-semibold">Effect</p>
				<p class="text-start whitespace-pre-wrap">{@html highlightEffects(card.effect)}</p>
			</div>
		{/if}
		{#if card.trigger !== ''}
			<div class="flex flex-col items-start">
				<p class="text-xl font-semibold">Trigger</p>
				<p class="text-start whitespace-pre-wrap">{@html highlightEffects(card.trigger)}</p>
			</div>
		{/if}
		{#if card.translation_credit !== ""}
			<p class="text-white/70">Translated by: {card.translation_credit}</p>
		{/if}
		{#if card.hasAltArt}
			<div class="flex flex-wrap gap-x-4">
				<Toggle toggled={parallelStatus === "parallel"} onclick={toggleShowAltArt} hideLabel />
				<p class="text-white/70">Show Alternate Art</p>
			</div>
		{/if}
		{#if card.has_manga}
			<div class="flex flex-wrap gap-x-4">
				<Toggle toggled={parallelStatus === "manga"} onclick={toggleShowMangaArt} hideLabel />
				<p class="text-white/70">Show Manga Art</p>
			</div>
		{/if}
	</div>
</div>
