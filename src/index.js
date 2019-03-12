import { useReducer, useEffect } from "react";
import createDetectElementResize from "./vendor/detectElementResize";

const initialState = { width: 0, height: 0, running: false };
const reducer = (state, newState) => ({ ...state, ...newState });

function useAutoSizer(node, nonce = "", onResize = () => {}) {
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
        setState({ running: true });
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(runCallbacks);
        } else {
          timer = setTimeout(runCallbacks, 66);
        }
      }
    }

    function runCallbacks() {
      if (node) {
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
      clearTimeout(timer);
      _detectElementResize.removeResizeListener(node, _onResize);
    };
  }, []);

  return [width, height];
}

export default useAutoSizer;
