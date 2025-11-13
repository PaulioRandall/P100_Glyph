<script>
	import Canvas from './Canvas.js'
	import Two from 'two.js'
	import { ZUI } from 'two.js/extras/jsm/zui.js'
	import { onMount } from 'svelte'
	import Grid from './Grid.js'

	let windowWidth = $state(100)
	let windowHeight = $state(100)
	let windowPadding = 100

	let container = null
	let containerSize = $state(100)

	let canvas = null
	let grid = null

	onMount(init)

	function init() {
		canvas = new Canvas(container)
		grid = new Grid(canvas)
		canvas.add(grid)

		setTimeout(resize, 1)
	}

	function resize() {
		containerSize = Math.min(windowWidth, windowHeight) - windowPadding
		canvas.resize()
		grid.resize()
	}	

	$effect(() => {
		resize(canvas, grid, windowWidth, windowHeight)
	})
</script>

<svelte:window 
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight} />

<div
	bind:this={container}
	style:width="{containerSize}px"
	style:height="{containerSize}px"
	class="container">
	<!-- InnerHTML handled by Two instance -->
</div>

<style>
	.container {
		aspect-ratio: 1 / 1;

		border: 1px solid black;
	}
</style>
