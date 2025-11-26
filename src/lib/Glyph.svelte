<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	import ElementList from './ElementList.svelte'
	import CanvasControls from './CanvasControls.svelte'

	import { GridCanvas } from './ramen'
	import HoveredCell from './HoveredCell.js'
	import PathDrawer from './PathDrawer.js'
	import Diagram from './Diagram.js'

	let container = null
	let canvasStore = writable(null)

	onMount(() => {
		const canvas = new GridCanvas(container)
		canvasStore.set(canvas)

		function addElement(name, Clazz) {
			const element = new Clazz(canvas)		
			canvas.add(element)

			return () => {
				canvas.remove(element)
				
				if (element.free) {
					element.free()
				}
			}
		}
		
		canvas.load((canvas) => {
			function listenAndLog(type) {
				canvas.listen(type, () => console.log(type))	
			}

			if (true) {
				listenAndLog('hoveringcell')
				listenAndLog('startpath')
				listenAndLog('newpathvertex')
				listenAndLog('undopathvertex')
				listenAndLog('resetpath')
				listenAndLog('newpath')
				listenAndLog('diagramupdate')
			}
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

		setTimeout(() => canvas.reload(), 5000)
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
		<ElementList {canvasStore} />
	</div>

	<div class="canvas-controls">
		<CanvasControls {canvasStore} />
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
