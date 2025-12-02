
<script>
	let { canvas } = $props()
</script>

<div class="mode-display">
	<p role="note" aria-label="Input mode">
		{canvas.mode}
	</p>
</div>

<style>
	.mode-display {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 88px;
		height: 44px;

		background: lightgrey;
	}

	p {
		padding: 0;
		margin: 0;

		user-select: none;
	}
</style>
