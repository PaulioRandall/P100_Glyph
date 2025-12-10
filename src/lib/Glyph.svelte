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

	<div class="button-bar">
		<ButtonBar>
			<!--
				TODO: Allow user to edit points on existing shape.
				TODO: Allow user to select line join type.
				TODO: Allow user to select line cap type.
				TODO: Allow user to open and close the path.
			-->
			{#if canvas}
				<ModeDisplay {canvas} />
				<TogglePathClosure {canvas} />
				<DeleteElementButton {canvas} />
			{/if}
		</ButtonBar>
	</div>

	<div class="elements-pane">
		{#if canvas}
			<ElementList {canvas} />
		{/if}
	</div>
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

	.elements-pane {
		position: absolute;

		width: var(--element-pane-width);
		height: calc(100% - var(--gap) - var(--gap));

		top: var(--gap);
		right: var(--gap);

		background: rgba(0, 40, 120, 0.6);

		pointer-events: none;
	}

	.button-bar {
		position: absolute;

		width: calc(100% - var(--gap) - var(--gap) - var(--gap) - var(--element-pane-width));
		height: var(--unit-height);

		top: var(--gap);
		left: var(--gap);

		background: rgba(100, 0, 0, 0.5);

		pointer-events: none;
	}
</style>
