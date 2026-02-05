<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#1e1e23" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	/* Font styling */
	:global(*) {
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
	}

	/* Spinner animation */
	:global(.spinner) {
		border: 3px solid rgba(170, 170, 170, 0.2);
		border-top-color: rgba(170, 170, 170, 0.6);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Holo animation */
	:global(.holo) {
		position: relative;
		overflow: hidden;
	}

	:global(.holo::after) {
		content: '';
		position: absolute;
		inset: -50%;
		background: linear-gradient(
			135deg,
			rgba(255, 0, 150, 0.35),
			rgba(0, 180, 255, 0.35),
			rgba(120, 255, 180, 0.35),
			rgba(255, 230, 150, 0.35),
			rgba(255, 0, 150, 0.35)
		);
		mix-blend-mode: screen;
		animation: holo-flow 2s linear infinite alternate;
		pointer-events: none;
	}

	@keyframes holo-flow {
		0% {
			transform: translate(-25%, -25%);
		}
		100% {
			transform: translate(25%, 25%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.holo::after) {
			animation: none;
		}
	}
</style>
