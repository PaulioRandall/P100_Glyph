<script>
	import { onMount, tick } from 'svelte'
	import Cheddar from '$cheddar'
	import GridSVG from './GridSVG.js'
	import Grid from './Grid.js'
	import CellHalo from './CellHalo.js'
	import PathDrawer from './PathDrawer.js'
	import { ButtonBar, TextButton } from './components'
	
	let container = null
	let svg = null
	let grid = null
	let cellHalo = null
	let pathDrawer = null

	onMount(async () => {		
		svg = new GridSVG()
		container.appendChild(svg.element)
		
		await tick()

		svg.grid.size(9)
		svg.grid.buffer(5)

		svg.showGrid()

		cellHalo = new CellHalo()
		svg.add(cellHalo)		
	})

	function sizeToParent() {
		if (!svg) {
			return
		}
	}

	// Prevent right click:
	// 		oncontextmenu={(e) => e.preventDefault()}

	function beginPathDrawing() {
		pathDrawer = new PathDrawer()
		svg.add(pathDrawer)
	}
</script>

<svelte:window onresize={sizeToParent} />

<div class="glyph">
	<div
		role="application"
		bind:this={container}
		oncontextmenu={(e) => e.preventDefault()}
		class="canvas-container">
		<!-- InnerHTML handled by Two instance -->
	</div>


	<ButtonBar>
		<TextButton onclick={beginPathDrawing}>Draw Path</TextButton>
<!--
		{#if canvas}
			<ModeDisplay {canvas} />
			<TogglePathClosure {canvas} />
			<DeleteElementButton {canvas} />
		{/if}
		-->
	</ButtonBar>
<!--
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
	}

	.canvas-container {
		background: white;

		width: 100%;
		height: 100%;

		background: #222222;
	}
</style>
