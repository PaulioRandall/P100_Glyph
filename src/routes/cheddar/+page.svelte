<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)

	onMount(() => {
		svg = new Cheddar.SVG()
		svg.viewbox.set(0, 0, 100, 100)

		container.appendChild(svg.element)

		const path = new Cheddar.Path() //
			.moveTo(20, 20) //
			.cubicTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.lineToClose() //
			.addTo(svg)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'red')
			path.commands[2].curve(100, 50)
		}, 500)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'green')
			path.subPaths[0].straighten()
		}, 1000)

		setTimeout(() => {
			path.element.setAttribute('stroke', 'blue')
			path.subPaths[2].curve(60, 10, 30, 30)
		}, 1500)
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
