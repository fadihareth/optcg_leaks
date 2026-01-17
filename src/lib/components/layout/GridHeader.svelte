<script lang="ts">
	import type { CardSet } from '$lib/models/CardSet';
	let { data, count }: { data: CardSet; count: Record<string, number> } = $props();

    function format_rarity(rarity: string) {
        return rarity.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
</script>

<div class="flex flex-col p-6">
	<p class="text-3xl">{data.id} - {data.name}</p>
	<div class="flex gap-x-4 flex-wrap">
        {#each ["leader", "common", "uncommon", "rare", "super_rare", "secret_rare"] as r}
            <p>{format_rarity(r)}s: {count[r]} / {data.rarities[r]}</p>
        {/each}
	</div>
</div>
