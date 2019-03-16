import { useReducer, useEffect } from "react";
import createDetectElementResize from "./vendor/detectElementResize";
import { reducer } from "./reducer";

function useDetectElementResize({
  id,
  nonce = "",
  onResize = () => {},
  onExit = () => {}
}) {
  // check if there is an element with the given id
  // otherise fallback to document.body
  const targetNode = document.getElementById(id) || document.body;
  // setup the state
  const [state, setState] = useReducer(reducer, {
    width: targetNode.offsetWidth,
    height: targetNode.offsetHeight,
    running: false
  });

  const { width, height, running } = state;

  const callOnResize = ({ width, height }) => onResize({ width, height });

  const callbacks = [setState, callOnResize];

  useEffect(() => {
    const _detectElementResize = createDetectElementResize(nonce);
    let raf = null;

    function _onResize() {
      if (!running) {
        setState({ running: true });
        if (window.requestAnimationFrame) {
          raf = window.requestAnimationFrame(runCallbacks);
        } else {
          raf = setTimeout(runCallbacks, 66);
        }
      }
    }

    function runCallbacks() {
      const _targetNode = document.getElementById(id) || document.body;

      const { offsetWidth, offsetHeight } = _targetNode;
      return callbacks.forEach(callback =>
        callback({ width: offsetWidth, height: offsetHeight, running: false })
      );
    }

    _detectElementResize.addResizeListener(targetNode, _onResize);

    // force an initial run
    _onResize();
    return () => {
      if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(raf);
      } else {
        clearTimeout(raf);
      }
      _detectElementResize.removeResizeListener(targetNode, _onResize);
      onExit({ width, height });
    };
  }, []);

  return [width, height];
}

export default useDetectElementResize;
