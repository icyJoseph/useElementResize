import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import useDetectElementResize from "../../src/useDetectElementResize";
import useMutabilityObserver from "../../src/useMutabilityObserver";
import "./index.css";

function AutoSized({ open }) {
  const node = document.getElementById("root");
  const [width, height] = useDetectElementResize({ node });
  const [obsWidth, obsHeight] = useMutabilityObserver({ id: "root" });
  return (
    <div>
      Root dimensions:
      <div>
        <span className="text-muted">
          Width: <span className="text-success">{width}</span> px
        </span>{" "}
        <span className="text-muted">
          Height: <span className="text-danger">{height}</span> px
        </span>
      </div>
      <div>
        <span className="text-muted">
          obsWidth: <span className="text-success">{obsWidth}</span> px
        </span>{" "}
        <span className="text-muted">
          obsHeight: <span className="text-danger">{obsHeight}</span> px
        </span>
      </div>
    </div>
  );
}

function App() {
  const [open, toggle] = useState(false);
  const [list, expandList] = useState([]);

  const timed = () => setTimeout(() => toggle(!open), 2000);
  const addOne = () => expandList([...list, 1]);
  return (
    <div className="App">
      <section>
        <header>
          <h1>
            <code>useAutoSizer</code>
          </h1>
        </header>
      </section>
      <section>
        <div>
          <button onClick={timed}>Toggle</button>
        </div>
        <div>
          <button onClick={addOne}>Add 1</button>
        </div>
      </section>
      <section>
        <div>{open && <AutoSized open={open} />}</div>
      </section>
      <section>
        {list.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
