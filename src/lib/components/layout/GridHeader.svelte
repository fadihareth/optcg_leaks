<script lang="ts">
	import type { CardSet } from '$lib/models/CardSet';
	import Toggle from 'svelte-toggle';

	let {
		data,
		count,
		hideUnrevealedCards = $bindable()
	}: { data: CardSet; count: Record<string, number>; hideUnrevealedCards: boolean } = $props();

	const rarityMap: Record<string, string> = {
		L: 'Leader',
		C: 'Common',
		UC: 'Uncommon',
		R: 'Rare',
		SR: 'Super Rare',
		SEC: 'Secret Rare'
	} as const;
</script>

<div class="p-layout flex flex-col gap-1">
	<div class="flex items-center gap-3">
		<p class="tag px-4 py-1 text-lg text-white">{data.id}</p>
		<p class="text-xl font-semibold">{data.name}</p>
	</div>
	<div class="my-1 w-full border border-white/10"></div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		<p>&#x1F1EF;&#x1F1F5; Japan: {data.japan_release}</p>
		<p>/</p>
		<p>&#x1F30E; Global: {data.global_release}</p>
	</div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		{#each ['L', 'C', 'UC', 'R', 'SR', 'SEC'] as r}
			<p class="whitespace-nowrap">
				<span class="inline md:hidden">
					{r}: {count[r]} / {data.rarities[r]}
				</span>
				<span class="hidden md:inline">
					{rarityMap[r]}: {count[r]} / {data.rarities[r]}
				</span>
			</p>
		{/each}
	</div>
	<div class="flex flex-wrap gap-x-4">
		<Toggle bind:toggled={hideUnrevealedCards} hideLabel />
		<p class="text-white/70">Show Only Revealed Cards</p>
	</div>
</div>
