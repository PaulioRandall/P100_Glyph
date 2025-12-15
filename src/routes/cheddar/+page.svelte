<script>
	import { onMount } from 'svelte'
	import Cheddar from '$cheddar'

	let container = $state(null)
	let cheddar = $state(null)

	onMount(() => {
		cheddar = new Cheddar(container)
		cheddar.setViewbox(0, 0, 100, 100)

		const path = new Cheddar.Path()
		
		path.moveTo(20, 20)
		path.cubicCurveTo(30, 50, 50, 70, 80, 80)

		cheddar.add(path)

		setTimeout(() => {
			path.lineTo(80, 20)
			path.quadCurveTo(60, 40, 20, 20)
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
