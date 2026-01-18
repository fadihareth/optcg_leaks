<script lang="ts">
	import { onMount } from 'svelte';
	import { GridHeader, Header } from '$lib/components';
	import { Card } from '$lib/models/Card';
	import { CardSet } from '$lib/models/CardSet';
	import { fetchSets, loadData } from '$lib/stores/data';
	import { GridCard } from '$lib/components';
	import { countRarities, getCardId } from '$lib/util';

	let data: Record<string, { data: CardSet; cards: Record<string, Card> }> = $state({});
	let sets: string[] = $state([]);
	let selectedSet: string = $state('');

	let hideUnrevealedCards: boolean = $state(false);

	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			loading = true;
			sets = await fetchSets();
			const results = await Promise.all(
				sets.map(async (set) => {
					const data = await loadData(set.toLowerCase());
					return [set, data];
				})
			);
			selectedSet = sets[0];
			data = Object.fromEntries(results);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to fetch data';
			console.error('Error loading data:', err);
		} finally {
			loading = false;
		}
	});
</script>

<main>
	<Header {sets} bind:selectedSet />
	{#if loading}
		<div class="flex w-full justify-around p-10">
			<div class="spinner h-5 w-5"></div>
		</div>
	{:else}
		<GridHeader
			data={data[selectedSet]?.data}
			count={countRarities(data[selectedSet]?.cards)}
			bind:hideUnrevealedCards
		/>
		<div
			class="grid gap-3 px-6 pb-6"
			style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));"
		>
			{#each { length: data[selectedSet]?.data.cardCount + 1 }, id}
				<GridCard
					id={getCardId(id + 1, selectedSet)}
					card={data[selectedSet]?.cards[getCardId(id + 1, selectedSet)]}
					{hideUnrevealedCards}
				/>
			{/each}
		</div>
	{/if}
</main>
