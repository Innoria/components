# j-Pin

A simple PIN maker.

__Configuration__:

- `count` {Number} a count of PIN inputs (default: `6`)
- `required` {Boolean} enables "required" (default: `false`)
- `disabled` {Boolean} can disabled this control
- `hide` {Boolean} disables displaying of numbers (default: `false`)
-  __NEW__ `mask` {Boolean} disables the mask (default: `true`)

__Good to know__:

- input with no value creates a space
- it expects `String`

__Methods__:

- `component.focus()` focuses the first input
