import { EventGroup } from '$ramen'
import Node from './Node.js'

export default class Nodes extends EventGroup {
	_nodes = new EventGroup()

	reset() {
		this._nodes.clear()
	}

	setCells(cells) {
		this.reset()

		for (const node of cells) {
			const n = new Node(this.canvas, node)
			this._nodes.add(n)
		}
	}

	__when__added_to_group() {
		this.add(this._nodes)
	}

	__when__removed_from_group() {
		this.clear()
	}
}
