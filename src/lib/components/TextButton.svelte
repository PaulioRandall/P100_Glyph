
<script>
	let { children, ...rest } = $props()
</script>

<button {...rest}>
	{@render children?.()}
</button>

<style>
	button {
		cursor: pointer;

		height: 44px;
		min-width: 44px;

		padding: 0 0.5rem;
		margin: 0;

		&:disabled {
			cursor: not-allowed; 
		}
	}
</style>
