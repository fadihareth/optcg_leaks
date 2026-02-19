<script lang="ts">
	import Select from 'svelte-select';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SET_IDS } from '$lib/constants';

	let { loading }: { loading: boolean } = $props();

	const currentSetId = $derived(() => {
		const params = page.params as { setId?: string };
		return params?.setId?.toLowerCase() || SET_IDS[0];
	});

	const options = SET_IDS.map((id) => ({
		value: id,
		label: id.toUpperCase()
	}));

	const selectedOption = $derived(
		options.find((opt) => opt.value === currentSetId()) || options[0]
	);

	function handleSelectChange(item: any) {
		const selectedValue = item.value;
		if (selectedValue && selectedValue !== currentSetId()) {
			goto(`/${selectedValue}`);
		}
	}
</script>

<header class="p-layout sticky top-0 z-50 flex items-center justify-between bg-theme shadow-xs">
	<h1 class="text-xl font-semibold">OPTCG Leaks</h1>
	<Select
		items={options}
		value={selectedOption}
		clearable={false}
		searchable={false}
		placeholder="Select Set"
		class={`w-30! bg-theme! ${loading && 'opacity-0'} border-white/10!`}
	>
		<div slot="list" let:filteredItems class="bg-theme">
			{#each filteredItems as item}
				<button
					onclick={() => handleSelectChange(item)}
					class="flex w-full items-center p-3 hover:bg-white/10"
				>
					{item.label}
				</button>
			{/each}
		</div>
	</Select>
</header>
