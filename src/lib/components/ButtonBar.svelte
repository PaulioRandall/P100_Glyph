
<script>
	let { column=false, children } = $props()
</script>

<div
	class="button-bar"
	class:column>
	{@render children?.()}
</div>

<style>
	.button-bar {
		display: inline-flex;		
		justify-content: flex-start;
		align-items: center;

		width: 100%;
		height: 100%;

		gap: 4px;
		padding: 4px;
	}

	.column {
		flex-direction: column;
	}


</style>
