<script lang="ts">
	import type { Card } from '$lib/models/Card';
	let { card }: { card: Card } = $props();
</script>

<div
	class="flex h-3/4 gap-6 rounded-2xl bg-theme p-6 shadow-lg max-md:h-11/12 max-md:w-11/12 max-md:flex-col max-md:overflow-y-scroll lg:w-3/4"
>
	<img src={card.image} alt={card.id} class="h-full rounded-2xl object-contain" style="aspect-ratio: 562 / 782" />
	<div class="flex flex-col items-start gap-4">
		<div class="flex flex-col items-start gap-1">
			<p class="text-4xl font-semibold break-all">{card.name}</p>
			<p class="text-md">{card.type.join(' / ')}</p>
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
				<p class="text-start">{card.effect}</p>
			</div>
		{/if}
		{#if card.trigger !== ''}
			<p class="text-xl font-semibold">Trigger</p>
			<p class="text-start">{card.trigger}</p>
		{/if}
        <p>Translated By: {card.translation_credit}</p>
	</div>
</div>
