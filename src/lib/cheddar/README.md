# TODO

- Group: Document
- Path: Document
- SVG: Document
- Path: Add functions to change specific properties
- SVG: Write tests for functions where appropriate
- Elemental: Create new `DirtyMap` class that flags every name that has been modified as dirty. A function can be called to reset all the flags, e.g. after applying the map changes to the element in question. This allows only updates to elements that are needed, take place.
- $ Write tests for the following rules

```
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

# Considerations

- Consider if `canTranslate` is needed? It could be that all Elementals can be trasnlated? Rendering it obsolete.
