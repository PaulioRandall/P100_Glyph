<script>
	import { onMount, tick } from 'svelte'
	import Cheddar from '$cheddar'
	import GridSVG from './GridSVG.js'
	import Grid from './Grid.js'
	
	let container = null
	let svg = null
	let grid = null

	onMount(async () => {
		svg = new GridSVG()
		container.appendChild(svg.element)
		
		await tick()

		svg.grid.size(16)
		svg.grid.buffer(4)
		svg.showGrid()
	})

	function sizeToParent() {
		if (!svg) {
			return
		}
	}

	// Prevent right click:
	// 		oncontextmenu={(e) => e.preventDefault()}
</script>

<svelte:window onresize={sizeToParent} />

<div class="glyph">
	<div
		role="application"
		bind:this={container}

		class="canvas-container">
		<!-- InnerHTML handled by Two instance -->
	</div>

<!--
	<ButtonBar>
		
			TODO: Allow user to edit points on existing shape.
			TODO: Allow user to select line join type.
			TODO: Allow user to select line cap type.
		
		{#if canvas}
			<ModeDisplay {canvas} />
			<TogglePathClosure {canvas} />
			<DeleteElementButton {canvas} />
		{/if}
	</ButtonBar>

	{#if canvas}
		<ElementList {canvas} />
	{/if}
	-->
</div>

<style>
	.glyph {
		position: relative;

		width: 100%;
		height: 100%;

		background: #222222;
	}

	.canvas-container {
		background: white;

		width: 100%;
		height: 100%;
	}
</style>
