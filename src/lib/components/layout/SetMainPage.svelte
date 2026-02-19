<script lang="ts">
	import { CardDetails, GridCard, GridHeader, Header, Overlay } from '$lib/components';
	import type { Card } from '$lib/models/Card';
	import { CardSet } from '$lib/models/CardSet';
	import { loadData } from '$lib/stores/data';
	import { countRarities, getCardId } from '$lib/util';

	let { setId }: { setId: string } = $props();

	const setIdLower = $derived(setId.toLowerCase());

	// Card data and fetch
	let setData = $state<CardSet | null>(null);
	let cards = $state<Record<string, Card>>({});
	let spCards = $state<Card[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let toggles = $state({
		hideUnrevealedCards: false,
		showAltArts: false
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
					spCards = result.spCards;
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

	// Card details data
	let selectedCard = $state<Card | null>(null);
	function selectCard(card: Card | null = null) {
		selectedCard = card;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (selectedCard !== null) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		}
	}
	function changeCard(direction: 1 | -1) {
		if (!selectedCard || !setData) return;

		const currentId = selectedCard.id;
		const [prefix, cardNumber] = currentId.split('-');
		const maxCount = setData.cardCount;

		let currentNumber = parseInt(cardNumber);

		// Try at most cardCount times to avoid infinite loops
		for (let i = 0; i < maxCount; i++) {
			if (direction === 1) {
				currentNumber = (currentNumber % maxCount) + 1;
			} else {
				currentNumber = currentNumber === 1 ? maxCount : currentNumber - 1;
			}

			const nextId = getCardId(currentNumber, prefix);
			const nextCard = cards[nextId.toLowerCase()];

			if (nextCard) {
				selectedCard = nextCard;
				return;
			}
		}
	}

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
			bind:hideUnrevealedCards={toggles.hideUnrevealedCards}
			bind:showAltArts={toggles.showAltArts}
		/>
		<div
			class="p-layout grid gap-3 pt-0"
			style="grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));"
		>
			{#each { length: setData.cardCount }, id}
				<GridCard
					id={getCardId(id + 1, setIdLower)}
					card={cards[getCardId(id + 1, setIdLower)]}
					set={setIdLower}
					{selectCard}
					hideUnrevealedCards={toggles.hideUnrevealedCards}
					showAltArts={toggles.showAltArts}
				/>
			{/each}
			{#if toggles.showAltArts}
				{#each spCards as card}
					<GridCard
						id={card.id}
						{card}
						set={setIdLower}
						{selectCard}
						hideUnrevealedCards={toggles.hideUnrevealedCards}
						showAltArts={toggles.showAltArts}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</main>

<Overlay open={selectedCard !== null} onClose={selectCard}>
	<CardDetails
		card={selectedCard!}
		set={setIdLower}
		toggleShowOverlay={selectCard}
		{changeCard}
	/>
</Overlay>
