<script>
	import Canvas from './Canvas.js'
	import Two from 'two.js'
	import { ZUI } from 'two.js/extras/jsm/zui.js'
	import { onMount } from 'svelte'
	import Grid from './Grid.js'
	import LineDrawer from './LineDrawer.js'

	let container = null
	let canvas = null

	onMount(() => {
		canvas = new Canvas()

		canvas.onload((c) => {
			const grid = new Grid(c)
			const drawer = new LineDrawer(canvas, grid)

			return () => {
				drawer.destroy()
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
