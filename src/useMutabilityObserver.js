import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

export function useMutabilityObserver({
  id,
  onResize = () => {},
  onExit = () => {}
}) {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById(id) || document.body;
  // Set up hooks
  // setup state
  const [state, setState] = useReducer(reducer, {
    width: targetNode.offsetWidth,
    height: targetNode.offsetHeight,
    running: false
  });

  const { width, height, running } = state;

  // setup callbacks
  const callOnResize = ({ width, height }) => onResize({ width, height });
  const callbacks = [setState, callOnResize];

  useEffect(() => {
    // Callback function to execute when mutations are observed
    let raf;
    function _onMutation() {
      // if already running, avoid the payload
      if (!running) {
        // set as running
        setState({ running: true });
        if (window.requestAnimationFrame) {
          raf = window.requestAnimationFrame(runCallbacks);
        } else {
          raf = setTimeout(runCallbacks, 66);
        }
      }
    }

    function runCallbacks() {
      // try to get the target the user wants
      const _targetNode = document.getElementById(id) || document.body;
      const { offsetHeight, offsetWidth } = _targetNode;
      // run over the callbacks!
      return callbacks.forEach(callback =>
        callback({ width: offsetWidth, height: offsetHeight, running: false })
      );
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(_onMutation);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    // force an initial run!
    _onMutation();

    // Stop observing on unMount
    return () => {
      // clear any ungoing timers or rafs
      if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(raf);
      } else {
        clearTimeout(raf);
      }
      // catch left over records
      const leftOvers = observer.takeRecords();
      // disconnect
      observer.disconnect();
      // call onExit callback
      onExit({ leftOvers, width, height });
    };
  }, []);

  return [width, height];
}

export default useMutabilityObserver;
