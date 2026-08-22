<script lang="ts">
	let {
		src,
		alt,
		tags,
		style = ''
	}: { src: string; alt: string; tags: string; style?: string } = $props();
	
	let loaded = $state(false);

	function onload() {
		loaded = true;
	}
</script>

<img
    {src}
    {alt}
    class={tags + ' transition-opacity duration-200'}
    {onload}
    class:opacity-0={!loaded}
    {style}
/>
