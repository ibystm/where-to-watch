import { useEffect, useState } from "react";

export const useInterSectionObserver = (
  // TODO 型をちゃんt調べる
  elements: any[],
  option?: IntersectionObserverInit
): typeof res => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    }, option);

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
