import React from "react";
import ReactDOM from "react-dom";

import useAutoSizer from "../../src";
import "./index.css";

function AutoSized() {
  const [width, height] = useAutoSizer();
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
  return (
    <div className="App">
      <section>
        <header>
          <h1>
            <code>useAutoSizer</code>
          </h1>
        </header>
        <div>
          <AutoSized />
        </div>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
