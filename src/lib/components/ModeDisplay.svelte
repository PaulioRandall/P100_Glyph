
<script>
	import { onMount } from 'svelte'

	let { canvas } = $props()
	let mode = $state(canvas.mode)

	onMount(() => {
		return canvas.on('canvas_mode_changed', () => {
			mode = canvas.mode
		})
	})
</script>

<div class="mode-display">
	<p role="note" aria-label="Input mode">
		{mode}
	</p>
</div>

<style>
	.mode-display {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 88px;
		height: 44px;

		color: white;
		background: #222222;
	}

	p {
		padding: 0;
		margin: 0;

		user-select: none;
	}
</style>
