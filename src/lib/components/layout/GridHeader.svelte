<script lang="ts">
	import type { CardSet } from '$lib/models/CardSet';
    import Toggle from "svelte-toggle";

	let {
		data,
		count,
		hideUnrevealedCards = $bindable()
	}: { data: CardSet; count: Record<string, number>; hideUnrevealedCards: boolean } = $props();

	function format_rarity(rarity: string) {
		return rarity
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
</script>

<div class="flex flex-col p-6 gap-1">
	<div class="flex gap-3 items-center">
		<p class="tag text-lg text-white px-4 py-1">{data.id}</p>
		<p class="text-xl font-semibold">{data.name}</p>
	</div>
	<div class="border w-full mt-1 border-white/10"></div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		<p>&#x1F1EF;&#x1F1F5; Japan: {data.japan_release}</p>
		<p>/</p>
		<p>&#x1F30E; Global: {data.global_release}</p>
	</div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		{#each ['leader', 'common', 'uncommon', 'rare', 'super_rare', 'secret_rare'] as r}
			<p>{format_rarity(r)}s: {count[r]} / {data.rarities[r]}</p>
		{/each}
	</div>
    <div class="flex flex-wrap gap-x-4">
        <Toggle bind:toggled={hideUnrevealedCards} hideLabel />
        <p class="text-white/70">Show Only Revealed Cards</p>
    </div>
</div>
