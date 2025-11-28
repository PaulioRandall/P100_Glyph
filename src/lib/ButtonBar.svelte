
<script>
	let { children } = $props()
</script>

<div class="button-bar">
	{@render children?.()}
</div>

<style>
	.button-bar {
		width: 100%;
		height: 100%;
	}
</style>
