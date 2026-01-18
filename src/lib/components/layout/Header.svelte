<script lang="ts">
	import Select from 'svelte-select';

	let { sets, selectedSet = $bindable(), loading }: { sets: string[]; selectedSet: string; loading: boolean } = $props();
</script>

<header
	class="sticky top-0 z-50 flex items-center justify-between bg-theme/80 p-layout shadow-sm backdrop-blur"
>
	<h1 class="text-xl">OPTCG Leaks</h1>
	{#if !loading}
		<Select items={sets} value={selectedSet} bind:justValue={selectedSet} clearable={false} class="bg-theme! w-20!" placeholder="" />
	{/if}
</header>
