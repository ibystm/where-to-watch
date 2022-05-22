import { useEffect, useState } from "react";

export const useResizeObserver = (
  // TODO 型をちゃんt調べる
  elements: any,
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

export const useInterSectionObserver = (
  // TODO 型をちゃんt調べる
  elements: any,
  root?: any
): typeof res => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      root ? { root } : undefined
    );

    for (const elem of elements) {
      elem.current && intersectionObserver.observe(elem.current);
    }

    return () => intersectionObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const res = {
    isIntersecting,
  };

  return res;
};
