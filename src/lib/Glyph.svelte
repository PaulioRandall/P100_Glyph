<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	import ElementList from './ElementList.svelte'
	import CanvasControls from './CanvasControls.svelte'

	import { GridCanvas, EventUtil } from './ramen'
	import HoveredCell from './HoveredCell.js'
	import PathDrawer from './PathDrawer.js'
	import Diagram from './Diagram.js'

	let container = null
	let canvas = $state(null)
	let canvasStore = writable(null)

	onMount(() => {
		canvas = new GridCanvas(container, 7, 7)
		canvasStore.set(canvas)

		function addElement(name, Clazz) {
			const element = new Clazz(canvas)		
			canvas.add(element)
			return () => canvas.remove(element)
		}
		
		canvas.load((canvas) => {
			function listenAndLog(type) {
				canvas.listen(type, () => console.log(type))	
			}

			if (true) {
				listenAndLog('grid_cell_focus')

				listenAndLog('left_click')
				listenAndLog('middle_click')
				listenAndLog('right_click')

				listenAndLog('hovering_cell_init')

				listenAndLog('diagram_init')
				listenAndLog('diagram_updated')

				listenAndLog('path_drawer_init')
				listenAndLog('path_started')
				listenAndLog('path_vertex_added')
				listenAndLog('path_vertex_removed')
				listenAndLog('path_reset')
				listenAndLog('path_created')
			}
		})

		canvas.load((canvas) => {
			let pointerId = null

			canvas.listen('pointerdown', (e) => {
				pointerId = e.pointerId
			})

			canvas.listen('pointerup', (e) => {
				if (pointerId !== e.pointerId) {
					return
				}

				pointerId = null

				const eu = new EventUtil(e)
				const detail = { originalEvent: e }

				if (eu.isLeftButton()) {
					canvas.dispatch('left_click', detail)
				} else if (eu.isMiddleButton()) {
					canvas.dispatch('middle_click', detail)
				} else if (eu.isRightButton()) {
					canvas.dispatch('right_click', detail)
				}
			})
		})

		canvas.load((canvas) => {
			return addElement('HoveredCell', HoveredCell)
		})

		canvas.load((canvas) => {
			return addElement('Diagram', Diagram)
		})

		canvas.load((canvas) => {
			return addElement('PathDrawer', PathDrawer)
		})

		//setTimeout(() => canvas.reload(), 4000)

		return () => {
			canvas.free()
			canvas = null
		}
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
		{#if canvas}
			<ElementList {canvas} />
		{/if}
	</div>

	<div class="canvas-controls">
		{#if canvas}
			<CanvasControls {canvas} />
		{/if}
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
	}

	.canvas-controls {
		grid-area: canvas-controls;
	}
</style>
