<script lang="ts">
    import Overlay from '../ui/Overlay.svelte';
	import type { CardSet } from '$lib/models/CardSet';
	import Toggle from 'svelte-toggle';
    import { IconX } from '@tabler/icons-svelte';

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

    let open = $state<Boolean>(false);

	const rarityMap: Record<string, string> = {
		L: 'Leader',
		C: 'Common',
		UC: 'Uncommon',
		R: 'Rare',
		SR: 'Super Rare',
		SEC: 'Secret Rare'
	} as const;

    function onOpen() {
		open = true;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	}
    function onClose() {
        open = false;
        document.body.style.overflow = 'unset';
		document.body.style.paddingRight = '0';
    }
</script>

<div class="p-layout flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<h1 class="tag px-4 py-1 text-lg text-white">{data.id}</h1>
		<p class="text-xl font-semibold">{data.name}</p>
	</div>
	<div class="w-full border border-white/10"></div>
    <div class="flex">
        <button
            onclick={onOpen}
            class="hover:cursor-pointer hover:brightness-80 flex gap-1"
        >
            <span>&#8505;&#65039;</span>
            <p class="underline text-white/70">
 {data.descriptionHeader}</p>
        </button>
    </div>
	<div class="flex flex-wrap gap-x-4 text-white/70">
		{#if data.japan_release !== ""}
			<p>&#x1F1EF;&#x1F1F5; Japan: {data.japan_release}</p>
			<p class="max-md:hidden">/</p>
		{/if}
		<p>&#x1F30E; Global: {data.global_release}</p>
	</div>
    {#if data.raritiesNotice}
        <p class="text-white/70">{data.raritiesNotice}</p>
    {:else}
        <div class="my-2 flex flex-wrap gap-x-2 gap-y-4">
            {#each ['L', 'C', 'UC', 'R', 'SR', 'SEC'] as r}
                <p class="whitespace-nowrap" class:opacity-50={count[r] === data.rarities[r]}>
                    <span class="tag inline md:hidden">
                        {r} - {count[r]} / {data.rarities[r]}
                    </span>
                    <span class="tag hidden md:inline">
                        {rarityMap[r]}s: {count[r]} / {data.rarities[r]}
                    </span>
                </p>
            {/each}
        </div>
    {/if}
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

<Overlay {open} {onClose}>
    <div
        class="relative bg-theme px-5 pt-5 shadow-lg md:rounded-2xl md:w-3/4 max-md:w-full max-md:h-full max-md:overflow-y-scroll flex-col gap-5
            text-left [&_h2]:text-xl [&_h2]:font-bold [&_h2]:underline [&_h2]:mb-1 [&_p]:mb-5"
    >
        <button
            onclick={onClose}
            class="absolute top-5 right-5 z-20 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:bg-white/10"
        >
            <IconX />
        </button>
        <p class="text-2xl font-bold">{data.id} Distributor Description</p>
        {@html data.description}
    </div>
</Overlay>
