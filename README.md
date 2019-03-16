# useAutoSizer

This package provides two abstractions to detect element resize events. It depends on React-Hooks!

The first abstraction uses [javascript-detect-element-resize](https://github.com/sdecima/javascript-detect-element-resize), and it can be invoked as `useDetectElementResize`.

The second abstraction is a very simple implementation of mutability observers. We create an observer and connect it to the desired element.

Both of these, can take an `onResize` callback, which is of course, called every time a resize event happens. They also take `onExit`, which is called when the component unmounts.

Both of the abstractions return `width` and `height` when invoked, and consume their callbacks with `width` and `height`. When using `onExit` on `useMutabilityObserver`, the left over records are passed to the callback.

> These abstractions detect element resize! Not the same as attaching a listener to the resize event.

These abstractions can be used to replace the `AutoSizer` provided by [react-virtualized](https://github.com/bvaughn/react-virtualized), which implements [javascript-detect-element-resize](https://github.com/sdecima/javascript-detect-element-resize), through a `React Class Component`. Instead you can use these hooks and pass `width` and `height` down to, for example, the [MultiGrid](https://github.com/bvaughn/react-virtualized/blob/master/docs/MultiGrid.md) component.

## Demo

In the example provided, one can toggle the resize listeners off, this is delayed 2 seconds. During this time, you can spam resize events, and see that the component is unmounted cleanly without any callbacks, or attempts to set React state left.

As with any hook, you simply invoke it at the top of your function component and now you have access to variable `widht`, `height`, `obsWidth`, `obsHeight`.

This demo allows you to add divs with `1` as text content. These add as a `flex-column` and will stretch the `root` div, far beyond the height of the window. You can play around with `+1` and `-1` to see how the hooks respond to height changes.

```jsx
import React from 'react;
import {useMutabilityObserver, useDetectElementResize} from "use-element-resize";

function ElementResize() {
  const target = { id: "root" };
  const [width, height] = useDetectElementResize(target);
  const [obsWidth, obsHeight] = useMutabilityObserver(target);

  return (
    <div className="resize-results">
      <span>Root div dimensions:</span>
      <div>
        <code>useDetectElementResize</code>
        <div>
          <span className="text-muted">
            Width: <span className="text-success">{width}</span> px
          </span>
          {" - "}
          <span className="text-muted">
            Height: <span className="text-danger">{height}</span> px
          </span>
        </div>
      </div>
      <div>
        <code>useMutabilityObserver</code>
        <div>
          <span className="text-muted">
            obsWidth: <span className="text-success">{obsWidth}</span> px
          </span>
          {" - "}
          <span className="text-muted">
            obsHeight: <span className="text-danger">{obsHeight}</span> px
          </span>
        </div>
      </div>
    </div>
  );
}
```

## License

The MIT License (MIT)

Copyright (c) 2019 Joseph Chamochumbi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
