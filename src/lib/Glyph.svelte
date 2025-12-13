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

	// IDEA: There is only one canvas area, the user draws
	//       what they want and then selects an area for the
	//       image?
	//       This would require merging the core and shadow
	//       grids then adding functionality to specify the
	//       "print" or visual area.
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
		--unit-width: 160px;
		--unit-height: 52px;
		--overlay-gap: 24px;
		--overlay-bg: rgba(0, 40, 120, 0.6);
		--overlay-border-radius: 12px;

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
