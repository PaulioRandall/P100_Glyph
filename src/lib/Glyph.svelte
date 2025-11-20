<script>
	import { Canvas } from './ramen'
	import Two from 'two.js'
	import { ZUI } from 'two.js/extras/jsm/zui.js'
	import { onMount } from 'svelte'
	import { addGrid, removeGrid } from './grid.js'

	let container = null

	let canvas = null

	onMount(() => {
		canvas = new Canvas()

		canvas.onload((c) => {
			addGrid(c)
			return removeGrid
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
