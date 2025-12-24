<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)

	onMount(() => {
		svg = new Cheddar.SVG()

		svg.viewbox.setEdges(0, 0, 100, 100)
		container.appendChild(svg.element)

		const nav = new Cheddar.SVGNav(svg)

		const circle = new Cheddar.Circle() //
			.nuSetCenterX(15) //
			.nuSetCenterY(85) //
			.setRadius(10) //
			.addTo(svg)

		const path = new Cheddar.Path(20, 20) //
			.nuCubicTo(30, 50, 60, 40, 70, 70) //
			.nuLineTo(70, 20) //
			.lineToClose() //
			.addTo(svg)

		circle.setRadius(10).translateX(25).translateY(-25)
		circle.attrs.set('stroke', 'red')
	})
</script>

<main bind:this={container} class="container">
	<!-- Content controlled by Cheddar --> 
</main>

<style>
	.container {
		width: 100vw;
		max-width: 600px;
		height: 100vh;
		max-height: 600px;

		overflow: hidden;
	}
</style>
