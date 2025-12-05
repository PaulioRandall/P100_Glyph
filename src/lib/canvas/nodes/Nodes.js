import { EventGroup } from '$ramen'
import Node from './Node.js'

export default class Nodes extends EventGroup {
	_nodes = new EventGroup()

	__group__added() {
		this.add(this._nodes)
	}

	__group__removed() {
		this.clear()
	}

	__on__element_selected(e) {
		const selected = this.canvas.selected

		this._nodes.clear()

		if (selected) {
			this._addNodesFor(selected)
		}
	}

	_addNodesFor(element) {
		for (const cmd of element.commands) {
			const n = new Node(this.canvas, cmd.to)
			this._nodes.add(n)
		}
	}
}
