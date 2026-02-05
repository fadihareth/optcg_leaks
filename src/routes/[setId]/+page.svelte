<script lang="ts">
	import { page } from '$app/state';
	import { SetMainPage } from '$lib/components';

	const setId = $derived((page.params as unknown as { setId: string }).setId);
</script>

<SetMainPage {setId} />
