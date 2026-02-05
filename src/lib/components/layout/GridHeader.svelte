<script lang="ts">
	import type { CardSet } from '$lib/models/CardSet';
	import Toggle from 'svelte-toggle';

	let {
		data,
		count,
		hideUnrevealedCards = $bindable(),
		showAltArts = $bindable()
	}: {
		data: CardSet;
		count: Record<string, number>;
		hideUnrevealedCards: boolean;
		showAltArts: boolean;
	} = $props();

	const rarityMap: Record<string, string> = {
		L: 'Leader',
		C: 'Common',
		UC: 'Uncommon',
		R: 'Rare',
		SR: 'Super Rare',
		SEC: 'Secret Rare'
	} as const;
</script>

<div class="p-layout flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<h1 class="tag px-4 py-1 text-lg text-white">{data.id}</h1>
		<p class="text-xl font-semibold">{data.name}</p>
	</div>
	<div class="w-full border border-white/10"></div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		<p>&#x1F1EF;&#x1F1F5; Japan: {data.japan_release}</p>
		<p class="max-md:hidden">/</p>
		<p>&#x1F30E; Global: {data.global_release}</p>
	</div>
	<div class="my-2 flex flex-wrap gap-x-2 gap-y-4">
		{#each ['L', 'C', 'UC', 'R', 'SR', 'SEC'] as r}
			<p class="whitespace-nowrap">
				<span class="tag inline md:hidden">
					{r} - {count[r]} / {data.rarities[r]}
				</span>
				<span class="tag hidden md:inline">
					{rarityMap[r]}s: {count[r]} / {data.rarities[r]}
				</span>
			</p>
		{/each}
	</div>
	<div class="flex flex-wrap gap-x-4 gap-y-1">
		<div class="flex flex-wrap gap-x-4">
			<Toggle bind:toggled={hideUnrevealedCards} hideLabel />
			<p class="text-white/70">Show Only Revealed Cards</p>
		</div>
		<div class="flex flex-wrap gap-x-4">
			<Toggle bind:toggled={showAltArts} hideLabel />
			<p class="text-white/70">Show Alternate Arts</p>
		</div>
	</div>
</div>
