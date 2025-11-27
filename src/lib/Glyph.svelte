<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	import ElementList from './ElementList.svelte'
	import CanvasControls from './CanvasControls.svelte'

	import { GridCanvas, EventUtil } from '$ramen'
	import {
		EventLogger,
		ClickSimplifier,
		Diagram,
		HoveredCell,
		PathDrawer,
	} from './elements'
	
	let container = null
	let canvas = $state(null)

	function addElement(Clazz) {
		canvas.load(() => {
			const element = new Clazz(canvas)		
			canvas.add(element)
			return () => canvas.remove(element)
		})
	}

	onMount(() => {
		canvas = new GridCanvas(container, 7, 7)
		
		addElement(EventLogger)
		addElement(ClickSimplifier)
		addElement(HoveredCell)
		addElement(Diagram)
		addElement(PathDrawer)

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
