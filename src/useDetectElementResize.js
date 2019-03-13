import { useReducer, useEffect } from "react";
import createDetectElementResize from "./vendor/detectElementResize";
import { reducer, initialState } from "./reducer";

function useDetectElementResize({
  node,
  nonce = "",
  onResize = () => {},
  onExit = () => {}
}) {
  const [{ width, height, running }, setState] = useReducer(
    reducer,
    initialState
  );

  const _onResize = ({ width, height }) => onResize({ width, height });

  const callbacks = [setState, _onResize];

  useEffect(() => {
    const _detectElementResize = createDetectElementResize(nonce);
    let timer = null;

    function _onResize() {
      if (!running) {
        setState({ running: true });
        if (window.requestAnimationFrame) {
          timer = window.requestAnimationFrame(runCallbacks);
        } else {
          timer = setTimeout(runCallbacks, 66);
        }
      }
    }

    function runCallbacks() {
      const { offsetWidth = 0, offsetHeight = 0 } = node;
      if (width !== offsetWidth && height !== offsetHeight) {
        return callbacks.forEach(callback =>
          callback({ width: offsetWidth, height: offsetHeight, running: false })
        );
      } else {
        return setState({ running: false });
      }
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

export default useDetectElementResize;
