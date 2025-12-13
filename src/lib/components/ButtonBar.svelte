
<script>
	let { children } = $props()
</script>

<div class="button-bar" >
	{@render children?.()}
</div>

<style>
	.button-bar {
		position: absolute;

		width: calc(100% - var(--gap) - var(--gap));
		height: calc(var(--unit-height));

		top: 0;
		left: var(--gap);

		display: inline-flex;		
		justify-content: flex-start;
		align-items: center;

		gap: 4px;
		padding: 4px;

		background: rgba(100, 0, 0, 0.5);
		border-radius: 8px;

		pointer-events: none;

		& :global(*) {
			pointer-events: auto;
		}
	}

	.column {
		flex-direction: column;
	}
</style>
