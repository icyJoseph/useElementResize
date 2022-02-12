import React, { Fragment, useReducer, useState, memo } from "react";
import ReactDOM from "react-dom";

import {
  useDetectElementResize,
  useMutabilityObserver,
  useResizeObserver
} from "../../src";
import "./index.css";

const ResizerObserverHook = memo(function ResizerObserverHook() {
  const target = { id: "root" };
  const [obsWidth, obsHeight] = useResizeObserver(target);

  return (
    <div className="resize-results">
      <span>Root div dimensions:</span>

      <div>
        <code>useResizeObserver</code>
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
});

const MutatibilityObserver = memo(function MutatibilityObserver() {
  const target = { id: "root" };
  const [obsWidth, obsHeight] = useMutabilityObserver(target);

  return (
    <div className="resize-results">
      <span>Root div dimensions:</span>

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
});

const ElementResize = memo(function ElementResize() {
  const target = { id: "root" };
  const [width, height] = useDetectElementResize(target);

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
    </div>
  );
});

function App() {
  const [open, toggle] = useReducer((x) => !x, true);
  const [list, expandList] = useState([]);

  const addOne = () => expandList([...list, 1]);
  const removeOne = () => expandList(list.slice(0, -1));

  return (
    <div className="App">
      <section>
        <header>
          <h1 className="display-4 text-pink">Element Resize Hooks</h1>
          <a
            href="https://github.com/icyJoseph/useElementResize"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </a>
        </header>
      </section>
      <section>
        <button className="btn btn-demo btn-dark" onClick={toggle}>
          Toggle
        </button>
        <button className="btn btn-demo btn-success" onClick={addOne}>
          + 1
        </button>
        <button className="btn btn-demo btn-danger" onClick={removeOne}>
          - 1
        </button>
      </section>
      <section className="element-resize">
        {open && (
          <Fragment>
            <ElementResize />

            <MutatibilityObserver />

            <ResizerObserverHook />
          </Fragment>
        )}
      </section>
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
