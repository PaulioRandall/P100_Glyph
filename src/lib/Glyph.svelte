<script>
	import { onMount } from 'svelte'

	import Canvas from './Canvas.js'
	import Grid from './Grid.js'
	import LineDrawer from './LineDrawer.js'
	import CursorHandler from './CursorHandler.js'
	import HoveredCell from './HoveredCell.js'

	let container = null
	let canvas = null

	onMount(() => {
		canvas = new Canvas()

		canvas.onload((canvas) => {
			const grid = new Grid(canvas.width, 9)
			const hoveredCell = new HoveredCell(grid, canvas.dom)
			const lineDrawer = new LineDrawer(hoveredCell)

			canvas.add(grid)
			canvas.add(hoveredCell)
			canvas.add(lineDrawer)

			const cursorClickHandler = new CursorHandler(
				canvas,
				grid,
				hoveredCell,
				lineDrawer,
			)

			return () => {
				canvas.remove(lineDrawer)
				canvas.remove(hoveredCell)
				canvas.remove(grid)

				cursorMoveHandler.free()
				lineDrawer.free()
				hoveredCell.free()
			}
		})

		canvas.init(container)
	})
</script>

<div
	bind:this={container}
	oncontextmenu={(e) => e.preventDefault()}
	class="container">
	<!-- InnerHTML handled by Two instance -->
</div>

<style>
	.container {
		width: 480px;
		height: 480px;

		border: 1px solid black;
	}
</style>
