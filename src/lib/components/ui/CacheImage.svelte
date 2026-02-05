<script lang="ts">
	import { getCachedImage } from '$lib/util';

	let {
		src,
		alt,
		tags,
		style = ''
	}: { src: string; alt: string; tags: string; style?: string } = $props();
	
	let imageSrc = $state<string | null>(null);
	let loaded = $state(false);

	function onload() {
		loaded = true;
	}

	$effect(() => {
		getCachedImage(src).then((res) => {
			imageSrc = res;
		});
	});
</script>

<img
	src={imageSrc}
	{alt}
	class={tags + ' transition-opacity duration-200'}
	{onload}
	class:opacity-0={!loaded}
	{style}
/>
