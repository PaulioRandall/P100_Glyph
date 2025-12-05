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

	__on__element_selected() {
		this._updatedNodesToSelected()
	}

	__on__element_updated(e) {
		const updatedElement = e.detail.element

		if (updatedElement === this.canvas.selected) {
			this._updatedNodesToSelected()
		}
	}

	_updatedNodesToSelected() {
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
