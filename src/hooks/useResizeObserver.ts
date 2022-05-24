import { useEffect } from "react";

export const useResizeObserver = (
  // TODO 型をちゃんと調べる
  elements: any[],
  callback: (entries: ResizeObserverEntry[]) => any
) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries);
    });

    for (const elem of elements) {
      elem.current && resizeObserver.observe(elem.current);
    }

    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
