<script>
	import { onMount, tick } from 'svelte'
	import Cheddar from '$cheddar'
	import GridSVG from './GridSVG.js'
	import ModeManager from './ModeManager.js'
	import Diagram from './Diagram.js'
	import EventLogger from './EventLogger.js'
	import { ButtonBar, TextButton } from './components'
	
	let container = null
	let svg = null
	let diagram = null
	let modeManager = null

	onMount(async () => {		
		svg = new GridSVG().add(new EventLogger())
		modeManager = new ModeManager().addTo(svg)
		diagram = new Diagram().addTo(svg)

		container.appendChild(svg.element)
		
		await tick()

		svg.grid.size(9)
		svg.grid.buffer(5)

		svg.showGrid()
	})

	function sizeToParent() {
		if (!svg) {
			return
		}
	}

	function beginPathDrawing() {
		modeManager.switchToDrawMode()
	}
</script>

<svelte:window onresize={sizeToParent} />

<div class="glyph">
	<div
		role="application"
		bind:this={container}
		oncontextmenu={(e) => e.preventDefault()}
		class="canvas-container">
		<!-- InnerHTML handled by Two instance -->
	</div>

	<ButtonBar>
		<TextButton onclick={beginPathDrawing}>Draw Path</TextButton>
<!--
		{#if canvas}
			<ModeDisplay {canvas} />
			<TogglePathClosure {canvas} />
			<DeleteElementButton {canvas} />
		{/if}
		-->
	</ButtonBar>
<!--
	{#if canvas}
		<ElementList {canvas} />
	{/if}
	-->
</div>

<style>
	.glyph {
		position: relative;

		width: 100%;
		height: 100%;
	}

	.canvas-container {
		background: white;

		width: 100%;
		height: 100%;

		background: #222222;
	}
</style>
