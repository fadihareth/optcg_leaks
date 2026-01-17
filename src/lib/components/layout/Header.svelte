<script lang="ts">
	let { sets, selectedSet = $bindable() }: { sets: string[]; selectedSet: string } = $props();
</script>

<header class="sticky top-0 z-50 flex items-center justify-between p-4 shadow-sm bg-theme/80 backdrop-blur">
	<h1 class="text-2xl">OPTCG Leaks</h1>
	<select>
		{#each sets as set}
			<option value={set}>{set}</option>
		{/each}
	</select>
</header>
