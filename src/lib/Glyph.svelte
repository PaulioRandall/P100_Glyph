<script>
	import { onMount } from 'svelte'

	import { GridCanvas, CursorEvents } from './ramen'
	import HoveredCell from './HoveredCell.js'
	import PathDrawer from './PathDrawer.js'

	let container = null
	let canvas = null

	onMount(() => {
		canvas = new GridCanvas(container)

		function addStoredElement(name, Clazz, ...args) {
			const element = new Clazz(...args)		

			canvas.add(element)
			canvas.store.put(name, element)

			return () => {
				canvas.remove(element)
				canvas.store.del(name)
			}
		}

		canvas.onload((canvas) => {
			return addStoredElement('HoveredCell', HoveredCell, canvas)
		})

		canvas.onload((canvas) => {
			return addStoredElement('PathDrawer', PathDrawer, canvas)
		})

		canvas.onload((canvas) => {
			const cursorEvents = new CursorEvents(
				canvas,
				canvas.store.get('HoveredCell'),
				canvas.store.get('PathDrawer'),
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
