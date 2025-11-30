
<script>
	let { row=true, column=false, children } = $props()
</script>

<div
	class="button-bar"
	class:row
	class:column>
	{@render children?.()}
</div>

<style>
	.button-bar {
		display: inline-flex;		

		width: 100%;
		height: 100%;

		gap: 4px;
		padding: 4px;
	}

	.column {
		flex-direction: column;
		justify-content: center;
	}

	.row {
		flex-direction: row;
		align-items: center;
	}
</style>
