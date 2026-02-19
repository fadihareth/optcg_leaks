<script lang="ts">
    import { fade } from "svelte/transition";

    let { open, onClose, children } = $props();
</script>

{#if open}
	<button
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/80"
        onclick={(e) => e.target === e.currentTarget && onClose()}
        transition:fade={{ duration: 100 }}
    >
		{@render children?.()}
	</button>
{/if}
