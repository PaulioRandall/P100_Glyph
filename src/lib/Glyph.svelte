<script>
	import { onMount } from 'svelte'

	import GridCanvas from './GridCanvas.js'
	import HoveredCell from './HoveredCell.js'
	import LineDrawer from './LineDrawer.js'
	import CursorHandler from './CursorHandler.js'

	let container = null
	let gridCanvas = null

	onMount(() => {
		gridCanvas = new GridCanvas()

		gridCanvas.onload((canvas) => {
			const hoveredCell = new HoveredCell(canvas)
			const lineDrawer = new LineDrawer(canvas)

			canvas.add(hoveredCell)
			canvas.add(lineDrawer)

			const cursorClickHandler = new CursorHandler(
				canvas,
				hoveredCell,
				lineDrawer,
			)

			return () => {
				canvas.remove(lineDrawer)
				canvas.remove(hoveredCell)

				cursorMoveHandler.free()
				lineDrawer.free()
				hoveredCell.free()
			}
		})

		gridCanvas.init(container)
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
