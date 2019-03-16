import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import useDetectElementResize from "../../src/useDetectElementResize";
import useMutabilityObserver from "../../src/useMutabilityObserver";
import "./index.css";

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

function App() {
  const [open, toggle] = useState(true);
  const [list, expandList] = useState([]);

  const timed = () => setTimeout(() => toggle(!open), 2000);
  const addOne = () => expandList([...list, 1]);
  const removeOne = () => expandList(list.slice(0, -1));

  return (
    <div className="App">
      <section>
        <header>
          <h1 className="display-4 text-pink">Element Resize Hooks</h1>
        </header>
      </section>
      <section>
        <button className="btn btn-demo btn-dark" onClick={timed}>
          Toggle
        </button>
        <button className="btn btn-demo btn-success" onClick={addOne}>
          + 1
        </button>
        <button className="btn btn-demo btn-danger" onClick={removeOne}>
          - 1
        </button>
      </section>
      <section className="element-resize">{open && <ElementResize />}</section>
      <div>
        {list.map((el, index) => (
          <div key={index} className="one">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
