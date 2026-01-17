<script lang="ts">
    import type { CardSet } from "$lib/models/CardSet";
	let { data }: { data: CardSet } = $props();
</script>

<div class="flex p-6">
    <p class="text-3xl">{data.id} - {data.name}</p>
</div>
