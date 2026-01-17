<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { CacheImage } from '$lib/components/ui';
	import X from '@tabler/icons-svelte/icons/x';

	let { card, toggleShowOverlay }: { card: Card; toggleShowOverlay: () => void } = $props();
</script>

<div
	class="relative flex h-3/4 gap-6 rounded-2xl bg-theme p-4 shadow-lg max-md:h-full max-md:w-full max-md:flex-col max-md:items-center max-md:overflow-y-scroll lg:w-3/4"
>
	<button
		onclick={toggleShowOverlay}
		class="absolute top-4 right-4 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:bg-white/10"
	>
		<X />
	</button>
	<CacheImage
		src={card.image}
		alt={card.id}
		tags="md:h-full max-md:w-full rounded-2xl object-contain max-md:mt-10"
		style="aspect-ratio: 562 / 782"
	/>
	<div class="flex flex-col items-start gap-4 md:pt-4">
		<div class="flex flex-col items-start">
			<p class="text-4xl font-semibold break-all">{card.name}</p>
			<p class="text-md pb-1 text-white/70">{card.type.join(' / ')}</p>
			<div class="flex flex-wrap gap-2">
				<p class="tag">{card.id}</p>
				<p class="tag">{card.color.join(' / ')}</p>
				<p class="tag">{card.attribute.join(' / ')}</p>
				<p class="tag">{card.rarity}</p>
			</div>
		</div>
		{#if card.effect !== ''}
			<div class="flex flex-col items-start">
				<p class="text-xl font-semibold">Effect</p>
				<p class="text-start whitespace-pre-wrap">{card.effect}</p>
			</div>
		{/if}
		{#if card.trigger !== ''}
			<div class="flex flex-col items-start">
				<p class="text-xl font-semibold">Trigger</p>
				<p class="text-start whitespace-pre-wrap">{card.trigger}</p>
			</div>
		{/if}
		<p>Translated By: {card.translation_credit}</p>
	</div>
</div>
