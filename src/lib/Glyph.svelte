<script>
	import { onMount } from 'svelte'

	import Canvas from './Canvas.js'
	import Grid from './Grid.js'
	import LineDrawer from './LineDrawer.js'
	import CursorHandler from './CursorHandler.js'

	let container = null
	let canvas = null

	onMount(() => {
		canvas = new Canvas()

		canvas.onload((canvas) => {
			const grid = new Grid(canvas)
			const lineDrawer = new LineDrawer(canvas, grid)
			
			const cursorClickHandler = new CursorHandler(
				canvas,
				grid,
				lineDrawer,
			)

			return () => {
				cursorMoveHandler.destroy()
				lineDrawer.destroy()
				grid.destroy()
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
