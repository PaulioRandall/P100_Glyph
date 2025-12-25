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
			.setCenterX(15) //
			.setCenterY(85) //
			.setRadius(10) //
			.addTo(svg) //

		const path = new Cheddar.Path(20, 20) //
			.cubicTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.lineToClose() //
			.addTo(svg) //

		circle.setRadius(10) //
			.moveX(25) //
			.moveY(-25) //
			.attr('stroke', 'red') //
	})
</script>

<main bind:this={container} class="container">
	<!-- Content controlled by Cheddar --> 
</main>

<style>
	:global(body) {
		margin: 0;
	}

	main {
		width: min(100vw, 100vh);
		height: min(100vw, 100vh);
		max-width: min(100vw, 100vh);
		max-height: min(100vw, 100vh);

		overflow: hidden;
	}
</style>
