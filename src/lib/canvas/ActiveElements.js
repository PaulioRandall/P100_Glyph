import { Two, EventGroup, NoticeGroup } from '$ramen'
import { ElementNode, PathEditor } from '../elements'

export default class ActiveElements extends EventGroup {
	_pathEditor = null
	_nodes = new NoticeGroup()
	_hovered = null

	clear() {
		super.clear()
		this._nodes.clear()
		this._hovered = null
	}

	__group__removed() {
		this.clear()
		this._pathEditor = null
	}

	__on__grid_cell_hover() {
		if (!this._pathEditor) {
			return
		}

		const hovered = this.canvas.hovered

		for (const n of this._nodes.children) {
			if (n.cell === hovered) {
				this._setHoveredNode(n)
				return
			}
		}

		this._setHoveredNode(null)
	}

	__on__selected_element_edit_request(e) {
		if (!this._pathEditor) {
			return
		}

		const path = this._pathEditor.path
		const changes = e.detail

		if (typeof changes.closed === 'boolean') {
			this._pathEditor.setClosed(changes.closed)
		}

		this.canvas.dispatch('element_updated', {
			element: path,
		})
	}

	__on__element_focused(e) {
		this.canvas.lastFocused?.updateStyle()
		this.canvas.focused?.updateStyle()
	}

	__on__element_selected(e) {
		this.clear()
		this._pathEditor = null

		const selected = this.canvas.selected

		if (selected) {
			this._pathEditor = new PathEditor(this.canvas, selected)
			this.add(this._pathEditor)

			selected.commands //
				.map((cmd) => new ElementNode(this.canvas, cmd.to)) //
				.forEach((n) => this._nodes.add(n)) //

			this.add(this._nodes)
		}

		this.canvas.lastSelected?.updateStyle()
		this.canvas.selected?.updateStyle()
	}

	_setHoveredNode(newNode = null) {
		if (this._hovered) {
			const oldNode = this._hovered
			this._hovered.disableEditing()
			this._hovered = null

			this.canvas.dispatch('element_node_edit_start', {
				node: oldNode,
			})
		}

		if (newNode) {
			this._hovered = newNode
			this._hovered.enableEditing()

			this.canvas.dispatch('element_node_edit_end', {
				node: newNode,
			})
		}
	}
}
