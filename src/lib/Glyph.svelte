<script>
	import { onMount } from 'svelte'

	import { GlyphCanvas } from './canvas'
	import {
		ElementList,
		ButtonBar,
		DeleteElementButton,
		ModeDisplay,
		TogglePathClosure,
	} from './components'
	
	let container = null
	let canvas = $state(null)

	onMount(() => {
		canvas = new GlyphCanvas(container)
		canvas.setGridSize(9, 9)
	})
</script>

<div class="glyph">
	<div
		role="application"
		bind:this={container}
		oncontextmenu={(e) => e.preventDefault()}
		class="canvas-container">
		<!-- InnerHTML handled by Two instance -->
	</div>

	<ButtonBar>
		<!--
			TODO: Allow user to edit points on existing shape.
			TODO: Allow user to select line join type.
			TODO: Allow user to select line cap type.
		-->
		{#if canvas}
			<ModeDisplay {canvas} />
			<TogglePathClosure {canvas} />
			<DeleteElementButton {canvas} />
		{/if}
	</ButtonBar>

	{#if canvas}
		<ElementList {canvas} />
	{/if}
</div>

<style>
	.glyph {
		--unit-height: 52px;
		--gap: 24px;
		--element-pane-width: 160px;

		position: relative;

		width: 100%;
		height: 100%;

		background: #222222;
	}

	.canvas-container {
		background: white;

		width: 100%;
		height: 100%;
	}
</style>
