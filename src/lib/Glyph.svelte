<script>
	import { onMount } from 'svelte'

	import GridCanvas from './GridCanvas.js'
	import HoveredCell from './HoveredCell.js'
	import LineDrawer from './LineDrawer.js'
	import CursorEvents from './CursorEvents.js'

	let container = null
	let canvas = null

	onMount(() => {
		canvas = new GridCanvas(container)

		canvas.onload((canvas) => {
			const hoveredCell = new HoveredCell(canvas)
		
			canvas.add(hoveredCell)
			canvas.store.hoveredCell = hoveredCell
		
			return () => canvas.remove(hoveredCell)
		})

		canvas.onload((canvas) => {
			const lineDrawer = new LineDrawer(canvas)

			canvas.add(lineDrawer)
			canvas.store.lineDrawer = lineDrawer

			return () => canvas.remove(lineDrawer)
		})

		canvas.onload((canvas) => {
			const cursorEvents = new CursorEvents(
				canvas,
				canvas.store.hoveredCell,
				canvas.store.lineDrawer,
			)

			return () => cursorEvents.free()
		})
	})
</script>

<div class="border-container">
	<!-- 
		Border container required as putting a border on the
		canvas container offsets the internal coordinates by
		the border size. Barely noticable but still nice to
		keep things straight.
	-->
	<div
		bind:this={container}
		oncontextmenu={(e) => e.preventDefault()}
		class="container">
		<!-- InnerHTML handled by Two instance -->
	</div>
</div>

<style>
	.container {
		width: 480px;
		height: 480px;
	}

	.border-container {
		border: 2px solid black;
		border-radius: 8px;
	}
</style>
