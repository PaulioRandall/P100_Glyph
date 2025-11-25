<script>
	import { onMount } from 'svelte'

	import { GridCanvas, CursorEvents } from './ramen'
	import HoveredCell from './HoveredCell.js'
	import PathDrawer from './PathDrawer.js'
	import Diagram from './Diagram.js'

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
			return addStoredElement('Diagram', Diagram)
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

<div class="glyph">
	<div class="canvas-border-container">
		<!-- 
			Border container required as putting a border on the
			canvas container offsets the internal coordinates by
			the border size. Barely noticable but still nice to
			keep things straight.
		-->
		<div
			bind:this={container}
			oncontextmenu={(e) => e.preventDefault()}
			class="canvas-container">
			<!-- InnerHTML handled by Two instance -->
		</div>
	</div>

	<div class="diagram-element-list">

	</div>

	<div class="canvas-controls">

	</div>
</div>

<style>
	.glyph {
		--canvas-size: 400px;

		display: grid;
		grid-template-areas:
			"canvas diagram-content"
			"canvas-controls diagram-content";
		grid-template-rows: var(--canvas-size) 1fr;
		grid-template-columns: var(--canvas-size) 1fr;

		width: 100%;
		height: 100%;
	}

	.canvas-border-container {
		grid-area: canvas;

		border: 2px solid black;
	}

	.canvas-container {
		width: var(--canvas-size);
		height: var(--canvas-size);
	}

	.diagram-element-list {
		grid-area: diagram-content;
		height: 100%;

		background: lightskyblue;
	}

	.canvas-controls {
		grid-area: canvas-controls;

		background: LightCoral;
	}
</style>
