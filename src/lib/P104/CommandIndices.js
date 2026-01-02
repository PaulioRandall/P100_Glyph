const commandIndexSets = new Map()

// Schema: "type x y"
// E.g. String: "M 20 20"
// E.g. Array: ['M', 20, 20]
commandIndexSets.set('M', {
	type: 0, //
	x: 1, //
	y: 2, //
})

// Schema: "type x y"
// E.g. String: "L 20 20"
// E.g. Array: ['L', 20, 20]
commandIndexSets.set('L', {
	type: 0, //
	x: 1, //
	y: 2, //
})

// Schema: "type cp1X cp1Y x y"
// E.g. String: "Q 40 40 20 20"
// E.g. Array: ['Q', 40, 40, 20, 20]
commandIndexSets.set('Q', {
	type: 0, //
	cp1X: 1, //
	cp1Y: 2, //
	x: 3, //
	y: 4, //
})

// Schema: "type cp1X cp1Y cp2X cp2Y x y"
// E.g. String: "C 40 40 60 60 20 20"
// E.g. Array: ['C', 40, 40, 60, 60, 20, 20]
commandIndexSets.set('C', {
	type: 0, //
	cp1X: 1, //
	cp1Y: 2, //
	cp2X: 3, //
	cp2Y: 4, //
	x: 5, //
	y: 6, //
})

// Schema: "type"
// E.g. String: "Z"
// E.g. Array: ['Z']
commandIndexSets.set('Z', {
	type: 0, //
})

export default commandIndexSets
