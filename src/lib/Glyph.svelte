<script>
	import { onMount, tick } from 'svelte'
	import Cheddar from '$cheddar'
	
	let container = null
	let svg = null		

	onMount(async () => {
		svg = Cheddar.svg()
			.attr('visibility', 'hidden') //
			.styles({
				'width': 'min(100vw, 100vh)',
				'height': 'min(100vw, 100vh)',
			})

		svg.viewbox //
			.setEdges(0, 0, 50, 50) //
			.growBy(2, 'top left')

		container.appendChild(svg.element)

		Cheddar.circle(50, 50, 25)
			.addTo(svg) //

		// Slight offset because there's no inner stroke
		// setting.
		Cheddar.rect(0.5, 0.5, 99.5, 99.5)
 			.attrs({
				'stroke-dasharray': '3 3', //
			}) //
			.addTo(svg) //

		Cheddar.path(20, 20)
			.lineTo(35, 30) //
			.lineTo(50, 10) //
			.lineTo(55, 55) //
			.lineTo(30, 60) //
			.lineTo(15, 35) //
			.close()
			.addTo(svg)
			.clone()
			.growBy(0.5, 0, 0)
			.addTo(svg)
		
		await tick()

		sizeToParent()
		svg.attr('visibility', 'visible') 
	})

	function sizeToParent() {
		if (!svg) {
			return
		}
	}

	// Prevent right click:
	// 		oncontextmenu={(e) => e.preventDefault()}
</script>

<svelte:window onresize={sizeToParent} />

<div class="glyph">
	<div
		role="application"
		bind:this={container}

		class="canvas-container">
		<!-- InnerHTML handled by Two instance -->
	</div>

<!--
	<ButtonBar>
		
			TODO: Allow user to edit points on existing shape.
			TODO: Allow user to select line join type.
			TODO: Allow user to select line cap type.
		
		{#if canvas}
			<ModeDisplay {canvas} />
			<TogglePathClosure {canvas} />
			<DeleteElementButton {canvas} />
		{/if}
	</ButtonBar>

	{#if canvas}
		<ElementList {canvas} />
	{/if}
	-->
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
