# TODO

- Elemental: Document
- Group: Document
- Path: Document
- SVG: Document
- Path: Add functions to change specific properties
- Implement nuAdd, nuRemove, and nuClear to SVG
- SVG: Write tests for functions where appropriate
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
