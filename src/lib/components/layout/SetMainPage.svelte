<script lang="ts">
	import { GridHeader, Header } from '$lib/components';
	import { Card } from '$lib/models/Card';
	import { CardSet } from '$lib/models/CardSet';
	import { loadData } from '$lib/stores/data';
	import { GridCard } from '$lib/components';
	import { countRarities, getCardId } from '$lib/util';

    let { setId }: { setId: string } = $props();

	const setIdLower = $derived(setId.toLowerCase());

	let setData = $state<CardSet | null>(null);
	let cards = $state<Record<string, Card>>({});
	let loading = $state(true);
	let error = $state<string | null>(null);

	let filters = $state({
		hideUnrevealedCards: false
	});

	$effect(() => {
		const id = setIdLower;
		loading = true;
		error = null;
		loadData(id)
			.then((result) => {
				if (setIdLower === id) {
					setData = result.data;
					cards = result.cards;
				}
			})
			.catch((err) => {
				if (setIdLower === id) {
					error = err instanceof Error ? err.message : 'Failed to fetch data';
					console.error('Error loading data:', err);
					setData = null;
					cards = {};
				}
			})
			.finally(() => {
				if (setIdLower === id) {
					loading = false;
				}
			});
	});

	const pageTitle = $derived(`${setId.toUpperCase()} Cardlist`);
</script>

<svelte:head>
	<title>{pageTitle} - OPTCG Leaks</title>
	<meta
		name="description"
		content="Full {pageTitle} with English translations of revealed and leaked cards for the One Piece Card Game."
	/>
</svelte:head>

<main>
	<Header {loading} />
	{#if loading}
		<div class="flex w-full justify-around p-10">
			<div class="spinner h-5 w-5"></div>
		</div>
	{:else if error}
		<div class="p-layout text-red-500">{error}</div>
	{:else if setData}
		<GridHeader
			data={setData}
			count={countRarities(cards)}
			bind:hideUnrevealedCards={filters.hideUnrevealedCards}
		/>
		<div
			class="p-layout grid gap-3 pt-0"
			style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));"
		>
			{#each { length: setData.cardCount + 1 }, id}
				<GridCard
					id={getCardId(id + 1, setIdLower)}
					card={cards[getCardId(id + 1, setIdLower)]}
					hideUnrevealedCards={filters.hideUnrevealedCards}
				/>
			{/each}
		</div>
	{/if}
</main>
