<script lang="ts">
	import Select from 'svelte-select';

	let {
		sets,
		selectedSet = $bindable(),
		loading
	}: { sets: string[]; selectedSet: string; loading: boolean } = $props();
</script>

<header
	class="p-layout sticky top-0 z-50 flex items-center justify-between bg-theme/80 shadow-sm backdrop-blur"
>
	<h1 class="text-xl">OPTCG Leaks</h1>
	<Select
		items={sets}
		value={selectedSet}
		bind:justValue={selectedSet}
		clearable={false}
		class={`w-20! bg-theme! ${loading && 'opacity-0'}`}
		placeholder=""
	/>
</header>
