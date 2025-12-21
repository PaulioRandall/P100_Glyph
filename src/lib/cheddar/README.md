# TODO

- Remove Updateable from SubPath
- Document Circle
- Consider using `attr` to hold onto Circle props cx, cy, and r?
- Document Command
- Document Elemental
- Document Group
- Consider if `canTranslate` is needed? It could be that all Elementals can be trasnlated? Rendering it obsolete.
- Document Path
- Add functions to change specific properties
- Document SVG
- Implement nuAdd, nuRemove, and nuClear to SVG
- Write tests for SVG functions where appropriate
- Write tests for the following rules

```
WHEN the SVG or its viewbox changes
- SVG is updated

WHEN a Group changes
- It is updated
- Its parent Group is updated
- If its parent is SVG, SVG is updated

WHEN a Path or Circle changes
- It is updated
- Its parent group is updated

WHEN a Command changes
- It is updated
- Its parent Path is updated
```
