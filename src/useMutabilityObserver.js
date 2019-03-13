import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

export function useMutabilityObserver({
  id,
  onMutation = () => {},
  onResize = () => {},
  onExit = () => {}
}) {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById(id) || document.body;
  // Set up hooks
  const { offsetHeight, offsetWidth } = targetNode;
  const [state, setState] = useReducer(reducer, {
    width: targetNode.offsetWidth,
    height: targetNode.offsetHeight,
    running: false
  });

  const { width, height, running } = state;

  useEffect(() => {
    // Callback function to execute when mutations are observed
    let raf;
    const callback = function() {
      // if already running, avoid the payload
      if (!running) {
        // set as running
        setState({ running: true });
        const { offsetHeight, offsetWidth } = targetNode;
        raf = window.requestAnimationFrame(() =>
          setState({ width: offsetWidth, height: offsetHeight, running: false })
        );
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Stop observing on unMount
    return () => {
      const leftOvers = observer.takeRecords();
      onExit({ leftOvers });
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return [width, height];
}

export default useMutabilityObserver;
