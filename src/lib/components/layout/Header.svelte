<script lang="ts">
    import { Select } from "$lib/components/ui";
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SET_IDS } from '$lib/constants';

	let value = $state(page.params?.setId?.toLowerCase() || SET_IDS[0]);

	const options = SET_IDS.map((id) => ({
		value: id,
		label: id.toUpperCase()
	}));

	function handleSelectChange(value: string | undefined) {
		goto(`/${value}`);
	}
</script>

<div class="flex flex-col gap-0">
	<!-- <p class="xl:px-20 max-xl:px-6 py-1 w-full bg-yellow-50/10">
		Note: this site will temporarily not be updated with new card reveals until 03/16
	</p> -->
	<header class="p-layout sticky top-0 z-50 flex items-center justify-between bg-theme shadow-xs">
		<h1 class="text-xl font-semibold">OPTCG Leaks</h1>
        <Select
            {options}
            bind:value={value}
            onChange={handleSelectChange}
            customClass="w-30!"
        />
	</header>
</div>
