
<script>
	let { children } = $props()
</script>

<div class="button-bar" >
	{@render children?.()}
</div>

<style>
	.button-bar {
		position: absolute;

		top: 0;
		left: 0;

		width: 100%;
		height: calc(var(--unit-height));

		background: var(--overlay-bg);		
		border-bottom-left-radius: var(--overlay-border-radius);

		display: inline-flex;		
		justify-content: flex-start;
		align-items: center;

		gap: 4px;
		padding: 4px;

		pointer-events: none;

		& :global(*) {
			pointer-events: auto;
		}
	}

	.column {
		flex-direction: column;
	}
</style>
