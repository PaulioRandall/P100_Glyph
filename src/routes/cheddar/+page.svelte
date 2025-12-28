<script>
	import './app.css'

	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)
	let borderPath = null

	onMount(() => {
		svg = new Cheddar.SVG()
			.attr('width', '100%') //
			.attr('height', '100%') //
			.attr('visibility', 'hidden') //

		setTimeout(() => {
			svg.sizeToElement() //
				.attr('visibility', 'visible') //
		}, 0)

		const circle = new Cheddar.Circle()
			.setCenterX(15) //
			.setCenterY(85) //
			.setRadius(10) //
			.addTo(svg) //

		const path = new Cheddar.Path(20, 20)
			.cubicTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.lineToClose() //
			.addTo(svg) //

		borderPath = new Cheddar.Path(0,0)
			.lineTo(0, 100) //
			.lineTo(100, 100) //
			.lineTo(100, 0) //
			.close() //
			.addTo(svg) //

		circle.setRadius(10) //
			.move(25, -25) //
			.attr('stroke', 'red') //

		container.appendChild(svg.element)
	})

	function onresize() {
		svg.sizeToElement()
	}
</script>

<svelte:window {onresize} />

<main bind:this={container}>
	<!-- Content controlled by Cheddar --> 
</main>

<style>
	:global(*) {
		margin: 0;
		box-sizing: border-box;
	}

	:global(html), :global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		display: block;

		margin: 0;
		padding: 0;

		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;

		overflow: hidden;
	}
</style>
