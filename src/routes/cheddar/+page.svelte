<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)

	onMount(() => {
		svg = new Cheddar.SVG()

		svg.viewbox.setEdges(0, 0, 100, 100)
		container.appendChild(svg.element)

		const circle = new Cheddar.Circle() //
			.setCenterX(15) //
			.setCenterY(85) //
			.setRadius(10) //
			.addTo(svg)

		const path = new Cheddar.Path(20, 20) //
			.cubicTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.lineToClose() //
			.addTo(svg)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'red')
			path.commands[2].curve(100, 50)
			circle.nuSetRadius(15).nuTranslateX(5).translateY(-5)
		}, 500)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'green')
			path.subPaths[0].straighten()
			circle.nuSetRadius(20).nuTranslateX(5).translateY(-5)
		}, 1000)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'blue')
			path.subPaths[2].curve(60, 10, 30, 30)
			circle.nuSetRadius(25).nuTranslateX(5).translateY(-5)
		}, 1500)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'navy')
			svg.viewbox.nuSetWidthAnchorCenter(200).setHeightAnchorCenter(200)
			//circle.element.setAttribute('stroke', 'red')
			circle.attr('stroke', 'red')
		}, 2000)
	})
</script>

<div bind:this={container} class="container">
	<!-- Content controlled by Cheddar --> 
</div>

<style>
	.container {
		width: 600px;
		height: 600px;
	}
</style>
