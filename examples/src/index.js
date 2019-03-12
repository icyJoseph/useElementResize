import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import useAutoSizer from "../../src";
import "./index.css";

function AutoSized({ open }) {
  const node = document.getElementById("root");
  const [width, height] = useAutoSizer({
    node,
    onExit: () => console.log("exit")
  });
  return (
    <div>
      <span className="text-muted">
        Width: <span className="text-success">{width}</span> px
      </span>
      <span className="text-muted">
        Height: <span className="text-danger">{height}</span> px
      </span>
    </div>
  );
}

function App() {
  const [open, toggle] = useState(false);

  const timed = () => setTimeout(() => toggle(!open), 5000);
  return (
    <div className="App">
      <section>
        <header>
          <h1>
            <code>useAutoSizer</code>
          </h1>
        </header>
        <section>
          <div>
            <button onClick={timed}>Toggle</button>
          </div>
          <div>{open && <AutoSized open={open} />}</div>
        </section>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
