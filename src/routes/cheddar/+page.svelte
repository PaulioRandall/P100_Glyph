<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)

	onMount(() => {
		svg = new Cheddar.SVG()

		svg.viewbox.setEdges(0, 0, 100, 100)
		container.appendChild(svg.element)

		console.log("**********")

		const circle = new Cheddar.Circle() //
			.setCenterX(15) //
			.setCenterY(85) //
			.setRadius(10) //
			.addTo(svg)

		console.log("**********")

		const path = new Cheddar.Path(20, 20) //
			.cubicTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.lineToClose() //
			.addTo(svg)

					console.log("**********")

		setTimeout(() => {
			path.element.setAttribute('stroke', 'red')
			path.commands[2].curve(100, 50)
			circle.setRadius(15).translateX(5).translateY(-5)
					console.log("********** 500")
		}, 500)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'green')
			path.subPaths[0].straighten()
			circle.setRadius(20).translateX(5).translateY(-5)
					console.log("********** 1000")
		}, 1000)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'blue')
			path.subPaths[2].curve(60, 10, 30, 30)
			circle.setRadius(25).translateX(5).translateY(-5)
					console.log("********** 1500")
		}, 1500)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'navy')
			svg.viewbox.setWidthAnchorCenter(200).setHeightAnchorCenter(200)
			circle.element.setAttribute('stroke', 'red')
					console.log("********** 2000")
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
