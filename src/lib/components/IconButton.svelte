
<script>
	let { children, ...rest } = $props()
</script>

<button {...rest}>
	{@render children?.()}
</button>

<style>
	button {
		cursor: pointer;

		width: 44px;
		height: 44px;

		padding: 0;
		margin: 0;

		&:disabled {
			cursor: not-allowed; 
		}
	}
</style>
