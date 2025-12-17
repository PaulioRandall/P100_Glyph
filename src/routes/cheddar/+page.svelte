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
			.cubicCurveTo(30, 50, 60, 40, 70, 70) //
			.lineTo(70, 20) //
			.close() //

		svg.add(path)

		setTimeout(() => {
			path.lines[0].setStart(40, 20)
		}, 500)
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
