<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	import ElementList from './ElementList.svelte'
	import ButtonBar from './ButtonBar.svelte'
	import DeleteElementButton from './DeleteElementButton.svelte'

	import { GridCanvas, EventUtil, List } from '$ramen'
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

		const diagram = new Diagram(canvas)

		canvas.load(() => {
			canvas.add(diagram)
			canvas.store.set('diagram', diagram)

			return () => {
				canvas.store.delete('diagram')
				canvas.remove(diagram)
			}
		})
		
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
	<div class="button-bar-top">
			<ButtonBar>
				NEXT: Draw path button, which requires a 'mode' (because later we will be allowing selection)
			</ButtonBar>
				</div>

	<div class="button-bar-left">
<ButtonBar>

			</ButtonBar>
	</div>

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

	<div class="content-pane">
		{#if canvas}
			<ElementList {canvas} />
		{/if}
	</div>

	<div class="button-bar-bottom">
		{#if canvas}
			<ButtonBar>
				<DeleteElementButton {canvas} />
			</ButtonBar>
		{/if}
	</div>
</div>

<style>
	.glyph {
		--content-width: calc(100vw - 250px); 
		--content-height: calc(100vh - 100px);
		--content-size: min(var(--content-width), var(--content-height));

		display: grid;
		grid-template-areas:
			"button-bar-left button-bar-top content-pane"
			"button-bar-left content content-pane"
			"button-bar-left button-bar-bottom content-pane";
		grid-template-rows: 50px var(--content-size) 50px;
		grid-template-columns: 50px var(--content-size) 200px;

		width: 100%;
		height: 100%;

		background: #222222;
	}

.button-bar-top {
		grid-area: button-bar-top;

		background: indianred;
	}

	.button-bar-left {
		grid-area: button-bar-left;

		background: forestgreen;
	}

	.canvas-border-container {
		grid-area: content;

		background: white;
		border: 2px solid black;

		width: 100%;
		height: 100%;
	}

	.canvas-container {
		width: 100%;
		height: 100%;
	}

	.content-pane {
		grid-area: content-pane;

		background: dodgerblue;
	}

	.button-bar-bottom {
		grid-area: button-bar-bottom;

		background: indianred;
	}
</style>
