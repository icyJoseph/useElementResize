import { useReducer, useEffect, useRef } from "react";
import { reducer } from "./reducer";

const noop = () => {};

type State = {
  width: number;
  height: number;
  running: boolean;
};

type ResizeObserverProps = {
  id: string;
  onResize: (args: Pick<State, "width" | "height">) => void;
  onExit: (args: Pick<State, "width" | "height">) => void;
};

export function useResizeObserver({
  id,
  onResize = noop,
  onExit = noop
}: ResizeObserverProps) {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById(id) || document.body;
  // Set up hooks
  // setup state
  const [state, setState] = useReducer(
    (prev: State, next: Partial<State>) => reducer(prev, next),
    {
      width: targetNode.offsetWidth,
      height: targetNode.offsetHeight,
      running: false
    } as State
  );

  const { width, height, running } = state;

  const _onResize = useRef(onResize);
  _onResize.current = onResize;

  const _onExit = useRef(onExit);
  _onExit.current = onExit;

  useEffect(() => {
    // setup callbacks
    const callOnResize = ({ width, height, running: _ }: State) =>
      _onResize.current({ width, height });

    const callbacks = [setState, callOnResize];
    // Callback function to execute when mutations are observed
    let raf: ReturnType<typeof window.requestAnimationFrame>;

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
      return callbacks.forEach((callback) =>
        callback({ width: offsetWidth, height: offsetHeight, running: false })
      );
    }

    // Create an observer instance linked to the callback function
    const observer = new ResizeObserver(_onMutation);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, { box: "border-box" });
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
      // disconnect
      observer.disconnect();
      // call onExit callback
      _onExit.current({ width, height });
    };
  }, [setState]);

  return [width, height];
}

export default useResizeObserver;
