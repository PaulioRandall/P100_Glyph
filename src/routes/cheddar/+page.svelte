<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let svg = $state(null)
	let svgElement = $state(null)

	onMount(() => {
		svg = new Cheddar.SVG() //
			.setViewbox(0, 0, 100, 100) //

		svgElement = svg.element
		container.appendChild(svg.element)

		svg.onUpdate(() => {
			container.replaceChild(svg.element, svgElement)
			svgElement = svg.element
		})

		svg.onNotify((svg) => {
			console.log(svg)
		})

		const path = new Cheddar.Path() //
			.moveTo(20, 20) //
			.cubicCurveTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.close() // 

		svg.add(path)
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
