import { useReducer, useEffect } from "react";
import createDetectElementResize from "./vendor/detectElementResize";

const initialState = { width: 0, height: 0, running: false };
const reducer = (state, newState) => ({ ...state, ...newState });

function useAutoSizer({
  node,
  nonce = "",
  onResize = () => {},
  onExit = () => {}
}) {
  const [{ width, height, running }, setState] = useReducer(
    reducer,
    initialState
  );

  const setSizeCallback = ({ width, height }) =>
    setState({ width, height, running: false });

  const callbacks = [setSizeCallback, onResize];

  useEffect(() => {
    const _detectElementResize = createDetectElementResize(nonce);
    let timer = null;

    function _onResize() {
      if (!running) {
        console.log("onResize");
        setState({ running: true });
        if (window.requestAnimationFrame) {
          timer = window.requestAnimationFrame(runCallbacks);
        } else {
          timer = setTimeout(runCallbacks, 66);
        }
      }
    }

    function runCallbacks() {
      if (node) {
        console.log("running callbacks");
        const { offsetWidth = 0, offsetHeight = 0 } = node;
        if (width !== offsetWidth && height !== offsetHeight) {
          callbacks.forEach(callback =>
            callback({ width: offsetWidth, height: offsetHeight })
          );
        }
      }
      setState({ running: false });
    }

    _detectElementResize.addResizeListener(node, _onResize);

    return () => {
      if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(timer);
      } else {
        clearTimeout(timer);
      }
      _detectElementResize.removeResizeListener(node, _onResize);
      onExit({ width, height });
    };
  }, []);

  return [width, height];
}

export default useAutoSizer;
