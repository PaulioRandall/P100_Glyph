<script>
	import { Canvas } from './ramen'
	import Two from 'two.js'
	import { ZUI } from 'two.js/extras/jsm/zui.js'
	import { onMount } from 'svelte'
	import { addGrid, removeGrid } from './grid.js'

	let container = null
	let containerSize = $state(100)

	let canvas = null

	onMount(() => {
		canvas = new Canvas(container)

		canvas.onload((c) => {
			addGrid(c)
			return removeGrid
		})

		canvas.init()
	})
</script>

<div
	bind:this={container}
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
