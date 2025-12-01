<script>
	import { onMount } from 'svelte'

	import GlyphCanvas from './GlyphCanvas.svelte.js'
	import {
		ElementList,
		ButtonBar,
		DeleteElementButton,
		TogglePathDrawerButton,
	} from './components'
	
	let container = null
	let canvas = $state(null)

	onMount(() => {
		canvas = new GlyphCanvas(container, 7, 7)
		return () => canvas.free()
	})
</script>

<div class="glyph">
	<div class="top-button-bar">
			<ButtonBar>
				{#if canvas}
					<TogglePathDrawerButton {canvas} />
				{/if}
			</ButtonBar>
				</div>

	<div class="canvas-pane">
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

	<div class="right-button-bar">
		{#if canvas}
			<ButtonBar column>
					<DeleteElementButton {canvas} />
			</ButtonBar>
			{/if}
	</div>

	<div class="elements-pane">
		{#if canvas}
			<ElementList {canvas} />
		{/if}
	</div>

	<div class="bottom-button-bar">
		{#if canvas}
			<ButtonBar>

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
			"top-button-bar top-button-bar elements-pane"
			"canvas-pane right-button-bar elements-pane"
			"bottom-button-bar bottom-button-bar elements-pane";
		grid-template-rows: 50px var(--content-size) 50px;
		grid-template-columns: var(--content-size) 50px 200px;

		width: 100%;
		height: 100%;

		background: #222222;
	}

.top-button-bar {
		grid-area: top-button-bar;

		background: indianred;
	}

	.right-button-bar {
		grid-area: right-button-bar;

		background: forestgreen;
	}

	.canvas-pane {
		grid-area: canvas-pane;

		background: white;
		border: 2px solid black;

		width: 100%;
		height: 100%;
	}

	.canvas-container {
		width: 100%;
		height: 100%;
	}

	.elements-pane {
		grid-area: elements-pane;

		background: dodgerblue;
	}

	.bottom-button-bar {
		grid-area: bottom-button-bar;

		background: indianred;
	}
</style>
