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
	<p class="text-3xl">{data.id} - {data.name}</p>
	<div class="flex flex-wrap gap-x-4">
		{#each ['leader', 'common', 'uncommon', 'rare', 'super_rare', 'secret_rare'] as r}
			<p class="text-white/70">{format_rarity(r)}s: {count[r]} / {data.rarities[r]}</p>
		{/each}
	</div>
    <div class="flex flex-wrap gap-x-4">
        <Toggle bind:toggled={hideUnrevealedCards} hideLabel />
        <p class="text-white/70">Show Only Revealed Cards</p>
    </div>
</div>
