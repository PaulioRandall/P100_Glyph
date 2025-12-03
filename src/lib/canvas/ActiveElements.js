import { Two, EventGroup } from '$ramen'

export default class ActiveElements extends EventGroup {
	__group__removed() {
		super.clear()
	}

	__on__element_focused(e) {
		this.canvas.lastFocused?.updateStyle()
		this.canvas.focused?.updateStyle()
	}

	__on__element_selected(e) {
		super.clear()

		const selected = this.canvas.selected

		if (selected) {
			selected.commands //
				.map((cmd) => makeNode(cmd)) //
				.forEach((n) => super.add(n)) //
		}

		this.canvas.lastSelected?.updateStyle()
		this.canvas.selected?.updateStyle()
	}
}

function makeNode(cmd) {
	const radius = 16
	const { x, y } = cmd.to

	const circle = new Two.Circle(x, y, radius)

	circle.fill = 'lightblue'
	circle.stroke = 'black'
	circle.linewidth = 4

	return circle
}
